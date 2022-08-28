import { onChangeType } from '../../NumberPicker.interfaces'
export interface NumberPickerInputProps {
	value: number
	onSubmit: (value: number, type: onChangeType) => void
	error: boolean
	onError: (value: boolean) => void
	disabled?: boolean
	max: number
	min: number
	className?: string
}
