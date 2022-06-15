export type DataPickerFormats = string

interface DatePickerBase {
	format?: string
	disabled?: boolean
	className?: string
}

export type DatePickerValue = Date | Date[] | null
export type DatePickerOnChange = Exclude<DatePickerValue, null>

export interface DatePickerProps extends DatePickerBase {
	value: DatePickerValue
	onChange: (value: DatePickerOnChange) => void
}
