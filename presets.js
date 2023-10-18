const { combineRgb } = require('@companion-module/base')
const Icons = require('./icons')

module.exports = function (self) {
	const presets = {}

	// cue control
	presets['back'] = {
		type: 'button',
		category: 'Cue Control',
		name: 'Back',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(170, 0, 0),
			png64: Icons.ICON_BACK,
		},
		steps: [
			{
				down: [
					{
						actionId: 'back',
					},
				],
			},
		],
	}

	presets['go'] = {
		type: 'button',
		category: 'Cue Control',
		name: 'Go',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 170, 0),
			png64: Icons.ICON_GO,
		},
		steps: [
			{
				down: [
					{
						actionId: 'go',
					},
				],
			},
		],
	}

	presets['go_indicator'] = {
		type: 'button',
		category: 'Cue Control',
		name: 'Go (with current cue display)',
		style: {
			text: '$(theatremix:current_cue)',
			size: '18',
			color: combineRgb(0, 30, 0),
			bgcolor: combineRgb(0, 170, 0),
			png64: Icons.ICON_GO_OFFSET,
		},
		steps: [
			{
				down: [
					{
						actionId: 'go',
					},
				],
			},
		],
	}

	presets['jump_cue'] = {
		type: 'button',
		category: 'Cue Control',
		name: 'Jump to cue...',
		style: {
			text: '0',
			size: '24',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(204, 102, 0),
			png64: Icons.ICON_JUMP,
		},
		steps: [
			{
				down: [
					{
						actionId: 'jump_cue',
						options: {
							jumpcue: '0',
						},
					},
				],
			},
		],
	}

	// keypad
	presets['keypad_1'] = {
		type: 'button',
		category: 'Keypad',
		name: '1',
		style: {
			text: '1',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '1',
						},
					},
				],
			},
		],
	}

	presets['keypad_2'] = {
		type: 'button',
		category: 'Keypad',
		name: '2',
		style: {
			text: '2',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '2',
						},
					},
				],
			},
		],
	}

	presets['keypad_3'] = {
		type: 'button',
		category: 'Keypad',
		name: '3',
		style: {
			text: '3',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '3',
						},
					},
				],
			},
		],
	}

	presets['keypad_4'] = {
		type: 'button',
		category: 'Keypad',
		name: '4',
		style: {
			text: '4',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '4',
						},
					},
				],
			},
		],
	}

	presets['keypad_5'] = {
		type: 'button',
		category: 'Keypad',
		name: '5',
		style: {
			text: '5',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '5',
						},
					},
				],
			},
		],
	}

	presets['keypad_6'] = {
		type: 'button',
		category: 'Keypad',
		name: '6',
		style: {
			text: '6',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '6',
						},
					},
				],
			},
		],
	}

	presets['keypad_7'] = {
		type: 'button',
		category: 'Keypad',
		name: '7',
		style: {
			text: '7',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '7',
						},
					},
				],
			},
		],
	}

	presets['keypad_8'] = {
		type: 'button',
		category: 'Keypad',
		name: '8',
		style: {
			text: '8',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '8',
						},
					},
				],
			},
		],
	}

	presets['keypad_9'] = {
		type: 'button',
		category: 'Keypad',
		name: '9',
		style: {
			text: '9',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '9',
						},
					},
				],
			},
		],
	}

	presets['keypad_0'] = {
		type: 'button',
		category: 'Keypad',
		name: '0',
		style: {
			text: '0',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '0',
						},
					},
				],
			},
		],
	}

	presets['keypad_point'] = {
		type: 'button',
		category: 'Keypad',
		name: 'Point',
		style: {
			text: '.',
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_entry',
						options: {
							key: '.',
						},
					},
				],
			},
		],
	}

	presets['keypad_clear'] = {
		type: 'button',
		category: 'Keypad',
		name: 'Clear',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_CLEAR,
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_clear',
					},
				],
			},
		],
	}

	presets['jump_keypad'] = {
		type: 'button',
		category: 'Keypad',
		name: 'Jump to keypad cue',
		style: {
			text: '$(theatremix:keypad_jump_entry)',
			size: '24',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_JUMP,
		},
		steps: [
			{
				down: [
					{
						actionId: 'jump_keypad',
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'keypad_cue_entry',
				style: {
					bgcolor: combineRgb(204, 102, 0),
				},
			},
		],
	}

	presets['allocate_keypad'] = {
		type: 'button',
		category: 'Keypad',
		name: 'Allocate keypad channel to spare backup',
		style: {
			text: '$(theatremix:keypad_spare_entry)',
			size: '24',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_BACKUP_SPARE_KEYPAD_ALLOCATE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'keypad_spare',
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'keypad_spare_entry',
				style: {
					bgcolor: combineRgb(0, 0, 85),
				},
			},
		],
	}

	// selection
	presets['select_current'] = {
		type: 'button',
		category: 'Selection',
		name: 'Select current cue',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_SELECT_CURRENT,
		},
		steps: [
			{
				down: [
					{
						actionId: 'select_current',
					},
				],
			},
		],
	}

	presets['select_up'] = {
		type: 'button',
		category: 'Selection',
		name: 'Select up',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_SELECT_UP,
		},
		steps: [
			{
				down: [
					{
						actionId: 'select_up',
					},
				],
			},
		],
	}

	presets['select_down'] = {
		type: 'button',
		category: 'Selection',
		name: 'Select down',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_SELECT_DOWN,
		},
		steps: [
			{
				down: [
					{
						actionId: 'select_down',
					},
				],
			},
		],
	}

	presets['jump_selected'] = {
		type: 'button',
		category: 'Selection',
		name: 'Jump to selected cue',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_JUMP_SELECTED,
		},
		steps: [
			{
				down: [
					{
						actionId: 'jump_selected',
					},
				],
			},
		],
	}

	// editing
	presets['insert_cue'] = {
		type: 'button',
		category: 'Editing',
		name: 'Insert cue',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(76, 0, 102),
			png64: Icons.ICON_CUE_INSERT,
		},
		steps: [
			{
				down: [
					{
						actionId: 'insert_cue',
					},
				],
			},
		],
	}

	presets['clone_cue'] = {
		type: 'button',
		category: 'Editing',
		name: 'Clone cue',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(76, 0, 102),
			png64: Icons.ICON_CUE_CLONE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'clone_cue',
					},
				],
			},
		],
	}

	presets['delete_cue'] = {
		type: 'button',
		category: 'Editing',
		name: 'Delete cue',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(76, 0, 102),
			png64: Icons.ICON_CUE_DELETE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'delete_cue',
					},
				],
			},
		],
	}

	presets['undo'] = {
		type: 'button',
		category: 'Editing',
		name: 'Undo',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 85, 85),
			png64: Icons.ICON_UNDO,
		},
		steps: [
			{
				down: [
					{
						actionId: 'undo',
					},
				],
			},
		],
	}

	presets['redo'] = {
		type: 'button',
		category: 'Editing',
		name: 'Redo',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 85, 85),
			png64: Icons.ICON_REDO,
		},
		steps: [
			{
				down: [
					{
						actionId: 'redo',
					},
				],
			},
		],
	}

	presets['unlock'] = {
		type: 'button',
		category: 'Editing',
		name: 'Unlock editing',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(96, 0, 39),
			png64: Icons.ICON_UNLOCK,
		},
		steps: [
			{
				down: [
					{
						actionId: 'unlock',
					},
				],
			},
		],
	}

	presets['lock'] = {
		type: 'button',
		category: 'Editing',
		name: 'Lock editing',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(96, 0, 39),
			png64: Icons.ICON_LOCK,
		},
		steps: [
			{
				down: [
					{
						actionId: 'lock',
					},
				],
			},
		],
	}

	// backups
	presets['toggle_backup'] = {
		type: 'button',
		category: 'Backups',
		name: 'Toggle backup channel...',
		style: {
			text: 'Alice',
			size: '18',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 85),
			png64: Icons.ICON_BACKUP_TOGGLE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'toggle_backup',
						options: {
							channel: 1,
						},
					},
				],
			},
		],
	}

	presets['allocate_spare'] = {
		type: 'button',
		category: 'Backups',
		name: 'Allocate spare backup...',
		style: {
			text: 'Bob',
			size: '18',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 85),
			png64: Icons.ICON_BACKUP_SPARE_ALLOCATE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'allocate_spare',
						options: {
							channel: 2,
						},
					},
				],
			},
		],
	}

	presets['toggle_spare'] = {
		type: 'button',
		category: 'Backups',
		name: 'Toggle spare backup',
		style: {
			text: 'Spare',
			size: '18',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 85),
			png64: Icons.ICON_BACKUP_SPARE_TOGGLE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'toggle_spare',
					},
				],
			},
		],
	}

	presets['remove_spare'] = {
		type: 'button',
		category: 'Backups',
		name: 'Remove spare allocation',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 0, 85),
			png64: Icons.ICON_BACKUP_SPARE_REMOVE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'remove_spare',
					},
				],
			},
		],
	}

	// level offsets
	presets['record_offsets'] = {
		type: 'button',
		category: 'Level Offsets',
		name: 'Record level offsets',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 255),
			png64: Icons.ICON_OFFSETS_RECORD,
		},
		steps: [
			{
				down: [
					{
						actionId: 'record_offsets',
					},
				],
			},
		],
		feedbacks: [
			{
				feedbackId: 'record_offsets',
				style: {
					bgcolor: combineRgb(170, 0, 0),
				},
			},
		],
	}

	presets['clone_offsets'] = {
		type: 'button',
		category: 'Level Offsets',
		name: 'Clone level offsets',
		style: {
			text: '',
			size: 'auto',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 0, 0),
			png64: Icons.ICON_OFFSETS_CLONE,
		},
		steps: [
			{
				down: [
					{
						actionId: 'clone_offsets',
					},
				],
			},
		],
	}

	self.setPresetDefinitions(presets)
}
