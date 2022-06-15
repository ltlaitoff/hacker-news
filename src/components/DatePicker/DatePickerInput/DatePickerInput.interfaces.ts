export interface DatePickerInputProps {
	date: Date
	format: string
	onSubmit: (date: Date) => void
	disabled?: boolean
}
