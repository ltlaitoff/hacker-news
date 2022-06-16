export type DataPickerFormats = string

interface DatePickerBase {
	format?: string
	disabled?: boolean
	className?: string
}

export type DatePickerValue = Date | [Date, Date] | null
export type DatePickerOnChange = Exclude<DatePickerValue, null>

export interface DatePickerProps extends DatePickerBase {
	value: DatePickerValue
	onChange: (value: DatePickerOnChange) => void
}

export type DatePickerRangeValue = [Date, Date] | null
export type DatePickerRangeOnChange = Exclude<DatePickerValue, null>
export interface DatePickerRangeProps extends DatePickerBase {
	value: DatePickerRangeValue
	onChange: (value: DatePickerRangeOnChange) => void
}
