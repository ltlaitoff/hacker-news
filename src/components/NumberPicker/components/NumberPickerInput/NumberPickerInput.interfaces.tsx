import { NumberSubmitType } from '../../NumberPicker.interfaces'

export interface NumberPickerInputProps {
	value: number
	onSubmit: (value: number, type: NumberSubmitType) => void
	onError: (value: boolean) => void
	disabled?: boolean
	aboveZero?: boolean
}
