import { DatePickerInputProps } from './components/DatePickerInput'

export type DataPickerFormats = string

interface DatePickerBase {
	format?: string
	disabled?: boolean
	className?: string
	error: boolean
	onError: (value: boolean) => void
}

export enum onChangeTypes {
	BLUR = 'blur',
	ENTER_KEY = 'enterKey',
	CALENDAR = 'calendar'
}

export enum DatePickerTypes {
	STANDART = 'standart',
	RANGE = 'range'
}

export type DateInputProps = Omit<
	Omit<DatePickerInputProps, 'onSubmit'>,
	'date'
> & {
	date: [Date, Date]
	onSubmit: (date: [Date, Date], type: onChangeTypes) => void
	error: boolean
	onError: (value: boolean) => void
}

export type DatePickerStandartValue = Date | [Date, Date]
export type DatePickerStandartValueWithNull = Date | [Date, Date] | null
export type DatePickerStandartOnChange = Date | [Date, Date]

export type DatePickerRangeValue = [Date, Date]
export type DatePickerRangeValueWithNull = [Date, Date] | null
export type DatePickerRangeOnChange = [Date, Date]

export interface DatePickerStandartProps extends DatePickerBase {
	type?: DatePickerTypes.STANDART
	value: Date | [Date, Date] | null
	onChange: (value: Date | [Date, Date], type: onChangeTypes) => void
}

export interface DatePickerRangeProps extends DatePickerBase {
	type: DatePickerTypes.RANGE
	value: [Date, Date] | null
	onChange: (value: [Date, Date], type: onChangeTypes) => void
}

export type DatePickerProps = DatePickerStandartProps | DatePickerRangeProps
