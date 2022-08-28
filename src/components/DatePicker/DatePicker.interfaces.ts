import { DatePickerInputProps } from './components/DatePickerInput'

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
	date: DatePickerTwoDates
	onSubmit: (date: DatePickerTwoDates, type: onChangeTypes) => void
	error: boolean
	onError: (value: boolean) => void
}

export type DatePickerTwoDates = [Date, Date]

export interface DatePickerStandartProps extends DatePickerBase {
	type?: DatePickerTypes.STANDART
	value: Date | DatePickerTwoDates | null
	onChange: (value: Date | DatePickerTwoDates, type: onChangeTypes) => void
}

export interface DatePickerRangeProps extends DatePickerBase {
	type: DatePickerTypes.RANGE
	value: DatePickerTwoDates | null
	onChange: (value: DatePickerTwoDates, type: onChangeTypes) => void
}

export type DatePickerProps = DatePickerStandartProps | DatePickerRangeProps
