const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		keypad_cue_entry: {
			type: 'boolean',
			name: 'Keypad cue entry',
			description: 'Update jump button background with keypad input',
			defaultStyle: {
				bgcolor: combineRgb(204, 102, 0),
			},
			callback: (feedback) => {
				if (self.keypadJumpCue != '' && self.keypadMode == 'cue') {
					return true
				} else {
					return false
				}
			},
		},
		keypad_spare_entry: {
			type: 'boolean',
			name: 'Keypad spare entry',
			description: 'Update allocate spare button background with keypad input',
			defaultStyle: {
				bgcolor: combineRgb(0, 0, 85),
			},
			callback: (feedback) => {
				if (self.keypadMode == 'spare') {
					return true
				} else {
					return false
				}
			},
		},
		record_offsets: {
			type: 'boolean',
			name: 'Record offsets state',
			description: 'Update record offsets button background when active',
			defaultStyle: {
				bgcolor: combineRgb(170, 0, 0),
			},
			callback: (feedback) => {
				return self.recordOffsets
			},
		},
	})
}
