var instance_skel = require('../../instance_skel');
var debug;
var log;

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
    'send_blank': {
      label: 'Send custom OSC message',
      options: [
        {
          type: 'textinput',
          label: 'OSC Path',
          id: 'path',
          default: '/osc/path'
        }
      ]
    },
    'send_string': {
      label: 'Send custom OSC message with argument',
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
      ]
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
        size: '30',
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
      label: 'Jump to Cue',
      bank: {
        style: 'text',
        text: 'Jump to Cue',
        size: '14',
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
       label: 'Back',
       bank: {
         style: 'text',
         text: 'Back',
         size: '30',
         color: '16777215',
         bgcolor: self.rgb(255, 0, 0)
       },
       actions: [
         {
           action: 'back',
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
    case 'go':
      arg = null;
      cmd = '/go';
      break;
    case 'back':
      arg = null;
      cmd = '/back';
      break;
    case 'send_blank':
      arg = [];
      cmd = action.options.path;
      break;
    case 'send_string':
      var bol = {
        type: "s",
        value: "" + action.options.string
      };
      arg =  bol;
      cmd = action.options.path;
      break;
    case 'jump_cue':
      var bol = {
        type: "s",
        value: "" + action.options.jumpcue
      };
      arg =  bol;
      cmd = '/jump';
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
