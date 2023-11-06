module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'keypad_jump_entry', name: 'Keypad jump cue entry' },
		{ variableId: 'keypad_spare_entry', name: 'Keypad allocate spare entry' },
		{ variableId: 'current_cue', name: 'Last fired cue number' },
	])

	self.setVariableValues({
		keypad_jump_entry: '',
		keypad_spare_entry: '',
		current_cue: '',
	})
}
