import {
	DatePickerInputOnSubmitType,
	DatePickerInputProps
} from './DatePickerInput'

export type DataPickerFormats = string

interface DatePickerBase {
	format?: string
	disabled?: boolean
	className?: string
}

export type DateInputProps = Omit<
	Omit<DatePickerInputProps, 'onSubmit'>,
	'date'
> & {
	date: [Date, Date]
	onSubmit: (date: [Date, Date], type: DatePickerInputOnSubmitType) => void
}

export type DatePickerStandartValue = Date | [Date, Date]
export type DatePickerStandartValueWithNull = Date | [Date, Date] | null
export type DatePickerStandartOnChange = Date | [Date, Date]

export type DatePickerRangeValue = [Date, Date]
export type DatePickerRangeValueWithNull = [Date, Date] | null
export type DatePickerRangeOnChange = [Date, Date]

export interface DatePickerStandartProps extends DatePickerBase {
	type?: 'standart'
	value: Date | [Date, Date] | null
	onChange: (value: Date | [Date, Date]) => void
}

export interface DatePickerRangeProps extends DatePickerBase {
	type: 'range'
	value: [Date, Date] | null
	onChange: (value: [Date, Date]) => void
}

export type DatePickerProps = DatePickerStandartProps | DatePickerRangeProps
