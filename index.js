const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresets = require('./presets')
const OSC = require('osc')

class TheatreMixInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.osc = new OSC.UDPPort({})
		this.keypadJumpCue = ''
		this.keypadMode = 'cue'
		this.recordOffsets = false
		this.lastOSCRxTime = 0
		this.subscriptionExpiry = 0
		this.subscribeTimer = undefined
		this.reconnectTimer = undefined
		this.connectivityTimer = undefined
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresets() // export presets

		this.reconnectTimer = setInterval(() => {
			this.setupOscSocket()
		}, 2000)

		this.setupOscSocket()
	}

	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')

		if (this.subscribeTimer) {
			clearInterval(this.subscribeTimer)
			this.subscribeTimer = undefined
		}

		if (this.reconnectTimer) {
			clearInterval(this.reconnectTimer)
			this.reconnectTimer = undefined
		}

		if (this.connectivityTimer) {
			clearInterval(this.connectivityTimer)
			this.connectivityTimer = undefined
		}

		if (this.osc) {
			try {
				this.osc.close()
			} catch (e) {
				// Ignore
			}
		}
	}

	async configUpdated(config) {
		this.config = config

		if (!this.reconnectTimer) {
			this.reconnectTimer = setInterval(() => {
				this.setupOscSocket()
			}, 2000)
		}

		this.setupOscSocket()
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'Controls https://theatremix.com/',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
				default: '127.0.0.1',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updatePresets() {
		UpdatePresets(this)
	}

	setupOscSocket() {
		this.updateStatus(InstanceStatus.Connecting)

		if (this.subscribeTimer) {
			clearInterval(this.subscribeTimer)
			this.subscribeTimer = undefined
		}

		if (this.connectivityTimer) {
			clearInterval(this.connectivityTimer)
			this.connectivityTimer = undefined
		}

		if (this.osc) {
			try {
				this.osc.close()
			} catch (e) {
				// Ignore
			}
		}

		this.osc = new OSC.UDPPort({
			localAddress: '0.0.0.0',
			localPort: 0,
			broadcast: true,
			metadata: true,
			remoteAddress: this.config.host,
			remotePort: 32000,
		})

		this.osc.on('ready', () => {
			this.sendSubscribe()
		})

		this.osc.on('close', () => {
			if (this.subscribeTimer !== undefined) {
				clearInterval(this.subscribeTimer)
				this.subscribeTimer = undefined
			}
		})

		this.osc.on('message', (message) => {
			//console.log('debug', message)

			this.lastOSCRxTime = Date.now()

			if (message.address == '/subscribeok') {
				if (message.args && message.args[0].type == 'i') {
					// set up timers if this is the first successful subscription
					this.subscriptionExpiry = message.args[0].value

					// renewals must be at half the returned expiry value
					if (!this.subscribeTimer) {
						this.subscribeTimer = setInterval(() => {
							this.sendSubscribe()
						}, (this.subscriptionExpiry * 1000) / 2)

						this.updateStatus(InstanceStatus.Ok)
					}

					if (this.reconnectTimer) {
						clearInterval(this.reconnectTimer)
						this.reconnectTimer = undefined
					}

					if (!this.connectivityTimer) {
						this.connectivityTimer = setInterval(() => {
							this.connectivityCheck()
						}, 2000)
					}
				}
				this.log('debug', 'subscribe success!')
			} else if (message.address == '/subscribefail') {
				this.updateStatus(InstanceStatus.Connecting)
				this.log('debug', 'subscription failure')

				if (this.subscribeTimer) {
					clearInterval(this.subscribeTimer)
					this.subscribeTimer = undefined
				}

				if (this.connectivityTimer) {
					clearInterval(this.connectivityTimer)
					this.connectivityTimer = undefined
				}

				if (this.osc) {
					try {
						this.osc.close()
					} catch (e) {
						// Ignore
					}
				}

				this.updateStatus(InstanceStatus.Connecting)

				if (!this.reconnectTimer) {
					this.reconnectTimer = setInterval(() => {
						this.setupOscSocket()
					}, 2000)
				}
			} else if (message.address == '/cuefired') {
				if (message.args && message.args[0].type == 's') {
					this.setVariableValues({
						current_cue: message.args[0].value,
					})
				}
			} else if (message.address == '/recordoffsets') {
				if (message.args && message.args[0].type == 's') {
					this.recordOffsets = message.args[0].value == 'on'
					this.checkFeedbacks('record_offsets')
				}
			}
		})

		this.osc.open()
	}

	sendSubscribe() {
		try {
			this.osc.send({ address: '/subscribe', args: [] })
			this.log('debug', 'sent subscription request')
		} catch (e) {
			// nothing
		}
	}

	connectivityCheck() {
		if (!this.osc) return

		if (this.lastOSCRxTime == 0) return

		if (this.reconnectTimer) return

		if (Date.now() - this.lastOSCRxTime > 5000) {
			// lost session
			this.log('debug', 'session timeout')

			if (this.subscribeTimer) {
				clearInterval(this.subscribeTimer)
				this.subscribeTimer = undefined
			}

			if (this.osc) {
				try {
					this.osc.close()
				} catch (e) {
					// Ignore
				}
			}

			this.updateStatus(InstanceStatus.Connecting)

			this.reconnectTimer = setInterval(() => {
				this.setupOscSocket()
			}, 2000)

			this.setupOscSocket()

			return
		}

		// periodically generate some OSC traffic to verify session is still alive
		try {
			this.osc.send({ address: '/thump', args: [] })
		} catch (e) {
			// nothing
		}
	}
}

runEntrypoint(TheatreMixInstance, [])
