/*
 Version 1.0.4
	Added presets and actions to lock/unlock changes (Supported in X32TCv2.9.1).
	Added presets and actions for moving the selected cue (Supported in X32TCv2.9.1).
	Added presets and actions to Undo/Redo changes (Supported in X32TCv2.9.1).
	Added presets and actions to Add/Clone/Delete cues (Supported in X32TCv2.9.1).
	Changed preset colour to make more uniform.
	Changed preset font size to make more uniform.
	Added Numeric keypad presets and actions to allow entering a cue manually.
	Added User variable so that typed cue number can be seen in the outside of the module.
 
 Version 1.0.2
  Pulled from Git, indentation changed from hard space to tab.
  Changed "custom osc" commands to "currently unsupported" commands, but commented out as not yet implimented (currently used for testing purposes only)
 
 Version 1.0.1
    Added presets and actions to start & stop cues.
    Added preset and action to jump to a specific cue.

*/

var instance_skel = require('../../instance_skel');
var debug;
var log;

var keypad_jump_cue = "";

//keypad_jump_cue = "";

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	// Example: When this script was committed, a fix needed to be made
	// this will only be run if you had an instance of an older "version" before.
	// "version" is calculated out from how many upgradescripts your intance config has run.
	// So just add a addUpgradeScript when you commit a breaking change to the config, that fixes
	// the config.

	self.addUpgradeScript(function () {
		// just an example
		if (self.config.host !== undefined) {
			self.config.old_host = self.config.host;
		}
	});
	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
};

instance.prototype.init = function() {
	var self = this;

	self.status(self.STATE_OK);

	debug = self.debug;
	log = self.log;

	self.init_presets();
	
	self.setVariableDefinitions( [
		{
			label: 'Keypad number',
			name: 'n_jump_cue_num'
		}
	] );

	self.setVariable('n_jump_cue_num', keypad_jump_cue);

	
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;

	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'Controls X32TC by <a href="https://jamesholt.audio/x32tc/" target="_new">James Holt</a>' + '<br>'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 8,
			regex: self.REGEX_IP,
			default: '127.0.0.1'
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target Port',
			width: 4,
			regex: self.REGEX_PORT,
			default: '32000'
		},
		{
			type: 'textinput',
			id: 'passcode',
			label: 'OSC Pascode',
			width: 12,
			tooltip: 'The passcode to controll X32TC.\nNot currently implimented.'
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	debug("destroy");
};

instance.prototype.actions = function(system) {
	var self = this;

	self.system.emit('instance_actions', self.id, {
/*		'send_unsupport_command': {
			label: 'Send currently unsupported command',
				options: [
				{
					type: 'textinput',
					label: 'OSC Path',
					id: 'path',
					default: '/osc/path'
				}
			]
		},
		'send_unsupport_command_string': {
			label: 'Send currently unsupported command with argument',
			options: [
				{
					type: 'textinput',
					label: 'OSC Path',
					id: 'path',
					default: '/osc/path'
				},
				{
					type: 'textinput',
					label: 'Value',
					id: 'string',
					default: "text"
				}
			]
		}, */
		'go': {
			label: 'GO'
		},
		'back': {
			label: 'Back'
		},
		'jump_cue': {
			label: 'Jump to cue',
			options: [
				{
					type: 'textinput',
					label: 'Jump to which cue?',
					id: 'jumpcue',
					default: "1"
				}
			],
		},
		'select_cue': {
			label: 'Move Selected cue',
			options: [
				{
					type: 'textinput',
					label: 'Move Selected cue',
					id: 'selectcue',
					default: "current",
					choices: [
						{ id: 'up', label: 'Up' },
						{ id: 'current', label: 'Current' },
						{ id: 'down', label: 'Down'}
					]

				}
			],
		},
		'lock': {
			label: 'Lock'
		},
		'unlock': {
			label: 'Unlock'
		},
		'insertcue': {
			label: 'Insert Cue'
		},
		'clonecue': {
			label: 'Clone Cue'
		},
		'deletecue': {
			label: 'Delete Cue'
		},
		'undo': {
			label: 'Undo'
		},
		'redo': {
			label: 'Redo'
		},
		'keypad_ent': {
			label: 'Keypad Enter Key'
		},
		'keypad_clear': {
			label: 'Keypad Clear Key'
		},
		'keypad_num': {
			label: 'Number to represent',
			options: [
				{
					type: 'textinput',
					label: 'A digit 0-9',
					id: 'keypad_num',
					default: ""
				}
			],
		}

	});
}

instance.prototype.init_presets = function () {
		var self = this;
		var presets = [
		{
			category: 'CueList',
			label: 'GO',
			bank: {
				style: 'text',
				text: 'GO',
				size: '24',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 0)
			},
			actions: [
				{
					action: 'go',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Back',
			bank: {
				style: 'text',
				text: 'Back',
				size: '24',
				color: '16777215',
				bgcolor: self.rgb(255, 0, 0)
			},
			actions: [
				{
					action: 'back',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Jump to Cue',
			bank: {
				style: 'text',
				text: 'Jump to\\nCue',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'jump_cue',
					options: {
						jumpcue: '1',
					}
				}
			]
		},
		{
			category: 'CueList',
			label: 'Move Selected Cue Up',
			bank: {
				style: 'text',
				text: 'Select\\nUp',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 255)
			},
			actions: [
				{
					action: 'select_cue',
					options: {
						selectcue: 'up',
					}
				}
			]
		},
		{
			category: 'CueList',
			label: 'Use as selected Cue',
			bank: {
				style: 'text',
				text: 'Select\\nCurrent',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 255)
			},
			actions: [
				{
					action: 'select_cue',
					options: {
						selectcue: 'current',
					}
				}
			]
		},
		{
			category: 'CueList',
			label: 'Move Selected cue Down',
			bank: {
				style: 'text',
				text: 'Select\\nDown',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 255)
			},
			actions: [
				{
					action: 'select_cue',
					options: {
						selectcue: 'down',
					}
				}
			]
		},
		{
			category: 'CueList',
			label: 'Lock Changes',
			bank: {
				style: 'text',
				text: 'Lock\\nChanges',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'lock',
				}
			]
	},
		{
			category: 'CueList',
			label: 'Unlock Changes',
			bank: {
				style: 'text',
				text: 'Unlock\\nChanges',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 100)
			},
			actions: [
				{
					action: 'unlock',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Insert Cue',
			bank: {
				style: 'text',
				text: 'Insert\\nCue',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(255, 255, 0)
			},
			actions: [
				{
					action: 'insertcue',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Clone Cue',
			bank: {
				style: 'text',
				text: 'Clone\\nCue',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(255, 255, 0)
			},
			actions: [
				{
					action: 'clonecue',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Delete Cue',
			bank: {
				style: 'text',
				text: 'Delete\\nCue',
				size: '18',
				color: '16777215',
				bgcolor: self.rgb(255, 0, 0)
			},
			actions: [
				{
					action: 'deletecue',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Undo',
			bank: {
				style: 'text',
				text: 'Undo',
				size: '18',
				color: self.rgb(255, 255, 255),
				bgcolor: self.rgb(0, 0, 255)
			},
			actions: [
				{
					action: 'undo',
				}
			]
		},
		{
			category: 'CueList',
			label: 'Redo',
			bank: {
				style: 'text',
				text: 'Redo',
				size: '18',
				color: self.rgb(255, 255, 255),
				bgcolor: self.rgb(0, 0, 255)
			},
			actions: [
				{
					action: 'redo',
				}
			]
		},
		{
			category: 'CueList',
			label: 'keypad_num',
			bank: {
				style: 'text',
				text: 'Num',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 0)
			},
			actions: [
				{
					action: 'keypad_num',
				}
			]
		},
		{
			category: 'CueList',
			label: 'keypad_ent',
			bank: {
				style: 'text',
				text: 'Enter',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 0)
			},
			actions: [
				{
					action: 'keypad_ent',
				}
			]
		},
		{
			category: 'CueList',
			label: 'keypad_clear',
			bank: {
				style: 'text',
				text: 'Clear',
				size: '18',
				color: self.rgb(0, 0, 0),
				bgcolor: self.rgb(0, 255, 0)
			},
			actions: [
				{
					action: 'keypad_clear',
				}
			]
		}

	];
	self.setPresetDefinitions(presets);
}

instance.prototype.sendOSC = function (node, arg) {
	var self = this;
	var host = "";

	if (self.config.host !== undefined && self.config.host !== ""){
		host = self.config.host;
	}
	if (self.config.passcode !== undefined && self.config.passcode !== "") {
		self.system.emit('osc_send', host, self.config.port, "/connect", [self.config.passcode]);
	}
	self.system.emit('osc_send',host, self.config.port, node, arg);
};


instance.prototype.action = function(action) {
	var self = this;
	var cmd;
	var arg;

	debug('action: ', action);

	

	
	switch (action.action) {

/*		case 'send_unsupported_command':
			arg = [];
			cmd = action.options.path;
			break;

		case 'send_unsupported_command_string':
			var bol = {
			  type: "s",
			  value: "" + action.options.string
			};
			arg =  bol;
			cmd = action.options.path;
			break; */

		case 'go':
			arg = null;
			cmd = '/go';
			break;

		case 'back':
			arg = null;
			cmd = '/back';
			break;

		case 'jump_cue':
			var bol = {
				type: "s",
				value: "" + action.options.jumpcue
			};
			arg =  bol;
			cmd = '/jump';
			break;

		case 'select_cue':
			var bol = {
				type: "s",
				value: "" + action.options.selectcue
			};
			arg =  bol;
			cmd = '/select';
			break;

		case 'lock':
			arg = null;
			cmd = '/lock';
			break;

		case 'unlock':
			arg = null;
			cmd = '/unlock';
			break;

		case 'insertcue':
			arg = null;
			cmd = '/insertcue';
			break;

		case 'clonecue':
			arg = null;
			cmd = '/clonecue';
			break;

		case 'deletecue':
			arg = null;
			cmd = '/deletecue';
			break;

		case 'undo':
			arg = null;
			cmd = '/undo';
			break;

		case 'redo':
			arg = null;
			cmd = '/redo';
			break;

		case 'keypad_clear':
			keypad_jump_cue = "";
			self.setVariable('n_jump_cue_num', keypad_jump_cue);
			break;

		case 'keypad_ent':
			var bol = {
				type: "s",
				value: "" + keypad_jump_cue
			};
			arg =  bol;
			cmd = '/jump';
			keypad_jump_cue = "";
			self.setVariable('n_jump_cue_num', keypad_jump_cue);

			break;

		case 'keypad_num':
			keypad_jump_cue = keypad_jump_cue + action.options.keypad_num
			self.setVariable('n_jump_cue_num', keypad_jump_cue);
			break;

			

	}

	if (arg == null) {
		arg = [];
	}
	if (cmd !== undefined) {
		debug('sending', cmd, arg, "to", self.config.host);
		self.sendOSC(cmd, arg);
	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
