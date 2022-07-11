export type DatePickerInputOnSubmitType = 'blur' | 'enterKey'
export interface DatePickerInputProps {
	date: Date
	format: string
	onSubmit: (date: Date, type: DatePickerInputOnSubmitType) => void
	onError: (value: boolean) => void
	disabled?: boolean
}
