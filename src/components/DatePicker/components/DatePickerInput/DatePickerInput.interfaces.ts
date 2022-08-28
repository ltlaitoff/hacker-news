import { onChangeTypes } from '../../DatePicker.interfaces'
export interface DatePickerInputProps {
	date: Date
	format: string
	onSubmit: (date: Date, type: onChangeTypes) => void
	onError: (value: boolean) => void
	disabled?: boolean
}
