import { onChangeTypes } from '../../DatePicker.interfaces'
export interface DatePickerInputProps {
	format: string
	date: Date
	onSubmit: (date: Date, type: onChangeTypes) => void
	error: boolean
	onError: (value: boolean) => void
	disabled?: boolean
}

export { onChangeTypes }
