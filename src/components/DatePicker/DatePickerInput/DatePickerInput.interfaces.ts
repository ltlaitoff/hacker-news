export type DatePickerInputOnSubmitType = 'blur' | 'enterKey'
export interface DatePickerInputProps {
	date: Date
	format: string
	onSubmit: (date: Date, type: DatePickerInputOnSubmitType) => void
	disabled?: boolean
}
