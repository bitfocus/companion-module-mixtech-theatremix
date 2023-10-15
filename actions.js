module.exports = function (self) {
	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host} ${path} ${JSON.stringify(args)}`)
		if (self.osc) {
			try {
				self.osc.send({ address: path, args: args })
			} catch (e) {
				// Ignore
			}
		}
	}

	self.setActionDefinitions({
		go: {
			name: 'Go',
			callback: async (action) => {
				sendOscMessage('/go', [])
			},
		},
		back: {
			name: 'Back',
			callback: async (action) => {
				sendOscMessage('/back', [])
			},
		},
		jump_cue: {
			name: 'Jump to cue',
			options: [
				{
					type: 'textinput',
					label: 'Cue number',
					id: 'jumpcue',
					default: '0',
				},
			],
			callback: async (action) => {
				sendOscMessage('/jump', [
					{
						type: 's',
						value: action.options.jumpcue,
					},
				])
			},
		},
		keypad_entry: {
			name: 'Keypad entry',
			description: 'For use with with "jump to keypad cue" and "allocate keypad channel to spare backup" actions',
			options: [
				{
					type: 'dropdown',
					label: 'Key',
					id: 'key',
					default: '0',
					choices: [
						{ id: '0', label: '0' },
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '3' },
						{ id: '4', label: '4' },
						{ id: '5', label: '5' },
						{ id: '6', label: '6' },
						{ id: '7', label: '7' },
						{ id: '8', label: '8' },
						{ id: '9', label: '9' },
						{ id: '.', label: '.' },
					],
				},
			],
			callback: async (action) => {
				if (self.keypadMode == 'cue') {
					if (self.keypadJumpCue == '' && action.options.key == '.') {
						// prepend 0 to empty point input
						self.keypadJumpCue = '0.'
					} else if (self.keypadJumpCue == '0' && action.options.key != '.') {
						// strip leading 0 if not a point input
						self.keypadJumpCue = action.options.key
					} else if (
						!(self.keypadJumpCue.includes('.') && action.options.key == '.') &&
						self.keypadJumpCue.length < 7
					) {
						// prohibit multiple points in input
						// tmix maximum cue number is 9999.99 => 7 characters
						if (self.keypadJumpCue.includes('.') && self.keypadJumpCue.length > 3) {
							if (self.keypadJumpCue.substring(self.keypadJumpCue.length - 3, self.keypadJumpCue.length - 2) != '.') {
								// only accept two digits after a point
								self.keypadJumpCue = self.keypadJumpCue + action.options.key
							}
						} else if (
							!(self.keypadJumpCue.length == 4 && !self.keypadJumpCue.includes('.') && action.options.key != '.')
						) {
							// tmix maximum whole cue number is 9999, after 4 digits only accept a point
							self.keypadJumpCue = self.keypadJumpCue + action.options.key
						}
					}

					self.setVariableValues({
						keypad_jump_entry: self.keypadJumpCue,
						keypad_spare_entry: '',
					})
				} else if (self.keypadMode == 'spare') {
					if (action.options.key != '.' && self.keypadJumpCue.length <= 2) {
						// don't allow point input
						// but allow leading 0 => unallocate
						// max 3 digits
						self.keypadJumpCue = self.keypadJumpCue + action.options.key
					}

					self.setVariableValues({
						keypad_jump_entry: '',
						keypad_spare_entry: self.keypadJumpCue,
					})
				}

				self.checkFeedbacks('keypad_cue_entry', 'keypad_spare_entry')
			},
		},
		keypad_clear: {
			name: 'Keypad clear',
			callback: async (action) => {
				self.keypadJumpCue = ''
				self.keypadMode = 'cue'

				self.setVariableValues({
					keypad_jump_entry: '',
					keypad_spare_entry: '',
				})

				self.checkFeedbacks('keypad_cue_entry', 'keypad_spare_entry')
			},
		},
		jump_keypad: {
			name: 'Jump to keypad cue',
			description: 'Select a cue number using keypad entry actions, then execute this action to jump',
			callback: async (action) => {
				if (self.keypadMode == 'cue') {
					if (self.keypadJumpCue != '') {
						if (self.keypadJumpCue.endsWith('.')) {
							// strip off trailing point
							keypad_jump_cue = keypad_jump_cue.slice(0, -1)
						}

						sendOscMessage('/jump', [
							{
								type: 's',
								value: self.keypadJumpCue,
							},
						])
					}
					self.keypadJumpCue = ''

					self.setVariableValues({
						keypad_jump_entry: '',
						keypad_spare_entry: '',
					})
				}

				self.checkFeedbacks('keypad_cue_entry', 'keypad_spare_entry')
			},
		},
		select_current: {
			name: 'Select current cue',
			callback: async (action) => {
				sendOscMessage('/select', [
					{
						type: 's',
						value: 'current',
					},
				])
			},
		},
		select_up: {
			name: 'Select up',
			callback: async (action) => {
				sendOscMessage('/select', [
					{
						type: 's',
						value: 'up',
					},
				])
			},
		},
		select_down: {
			name: 'Select down',
			callback: async (action) => {
				sendOscMessage('/select', [
					{
						type: 's',
						value: 'down',
					},
				])
			},
		},
		jump_selected: {
			name: 'Jump to selected cue',
			callback: async (action) => {
				sendOscMessage('/jump', [
					{
						type: 's',
						value: 'selected',
					},
				])
			},
		},
		insert_cue: {
			name: 'Insert cue',
			callback: async (action) => {
				sendOscMessage('/insertcue', [])
			},
		},
		clone_cue: {
			name: 'Clone cue',
			callback: async (action) => {
				sendOscMessage('/clonecue', [])
			},
		},
		delete_cue: {
			name: 'Delete cue',
			callback: async (action) => {
				sendOscMessage('/deletecue', [])
			},
		},
		undo: {
			name: 'Undo',
			callback: async (action) => {
				sendOscMessage('/undo', [])
			},
		},
		redo: {
			name: 'Redo',
			callback: async (action) => {
				sendOscMessage('/redo', [])
			},
		},
		unlock: {
			name: 'Unlock editing',
			callback: async (action) => {
				sendOscMessage('/unlock', [])
			},
		},
		lock: {
			name: 'Lock editing',
			callback: async (action) => {
				sendOscMessage('/lock', [])
			},
		},
		record_offsets: {
			name: 'Record level offsets',
			callback: async (action) => {
				sendOscMessage('/recordoffsets', [])
			},
		},
		clone_offsets: {
			name: 'Clone level offsets',
			callback: async (action) => {
				sendOscMessage('/cloneoffsets', [])
			},
		},
		toggle_backup: {
			name: 'Toggle backup channel',
			options: [
				{
					type: 'number',
					label: 'Main Channel',
					id: 'channel',
					min: 1,
					max: 500,
					required: true,
					default: 1,
				},
			],
			callback: async (action) => {
				sendOscMessage('/togglebackup', [
					{
						type: 'i',
						value: parseInt(action.options.channel),
					},
				])
			},
		},
		allocate_spare: {
			name: 'Allocate spare backup',
			options: [
				{
					type: 'number',
					label: 'Main Channel',
					id: 'channel',
					min: 1,
					max: 500,
					required: true,
					default: 1,
				},
			],
			callback: async (action) => {
				sendOscMessage('/allocatespare', [
					{
						type: 'i',
						value: parseInt(action.options.channel),
					},
				])
			},
		},
		toggle_spare: {
			name: 'Toggle spare backup',
			callback: async (action) => {
				sendOscMessage('/togglespare', [])
			},
		},
		remove_spare: {
			name: 'Remove spare allocation',
			callback: async (action) => {
				sendOscMessage('/removespare', [])
			},
		},
		keypad_spare: {
			name: 'Allocate keypad channel to spare backup',
			description:
				'First execute this action, then select a channel using keypad entry actions, then execute this action again to allocate. Use 0 to remove the allocation.',
			callback: async (action) => {
				if (self.keypadJumpCue == '' && self.keypadMode == 'cue') {
					self.keypadMode = 'spare'
				} else if (
					self.keypadMode == 'spare' &&
					self.keypadJumpCue.length > 0 &&
					self.keypadJumpCue.length <= 3 &&
					!self.keypadJumpCue.includes('.')
				) {
					// doiiiittttt
					intChannel = parseInt(self.keypadJumpCue)
					if (intChannel <= 0) {
						// treat as unallocate
						sendOscMessage('/removespare', [])
					} else {
						sendOscMessage('/allocatespare', [
							{
								type: 'i',
								value: intChannel,
							},
						])
					}

					self.keypadJumpCue = ''
					self.keypadMode = 'cue'

					self.setVariableValues({
						keypad_jump_entry: '',
						keypad_spare_entry: '',
					})
				} else if (self.keypadMode == 'spare') {
					// invalid input, reset
					self.keypadJumpCue = ''
					self.keypadMode = 'cue'

					self.setVariableValues({
						keypad_jump_entry: '',
						keypad_spare_entry: '',
					})
				}

				self.checkFeedbacks('keypad_cue_entry', 'keypad_spare_entry')
			},
		},
	})
}
