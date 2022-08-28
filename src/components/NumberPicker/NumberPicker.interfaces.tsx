export type NumberPickerStandartValue = number | [number, number]
export type NumberPickerStandartValueWithNull = number | [number, number] | null
export type NumberPickerStandartOnChange = number | [number, number]

export enum onChangeType {
	BLUR = 'blur',
	ENTER_KEY = 'enterKey',
	INTERVAL = 'interval'
}

export enum stepType {
	UP = 'up',
	DOWN = 'down'
}
export interface NumberPickerProps {
	value: number
	onChange: (value: number, type: onChangeType) => void
	error: boolean
	onError?: (value: boolean) => void
	disabled?: boolean
	className?: string
	max?: number
	min?: number
}

// import { NumberPickerInputProps } from './components/NumberPickerInput'

// export type DataPickerFormats = string

// export type NumberInputProps = Omit<
// 	Omit<NumberPickerInputProps, 'onSubmit'>,
// 	'value'
// > & {
// 	value: [number, number]
// 	onSubmit: (number: [number, number]) => void
// 	onError?: (value: boolean) => void
// 	aboveZero?: boolean
// }

// export type NumberPickerStandartValue = number | [number, number]
// export type NumberPickerStandartValueWithNull =
// 	| number
// 	| [number, number]
// 	| null
// export type NumberPickerStandartOnChange = number | [number, number]

// export type NumberPickerRangeValue = [number, number]
// export type NumberPickerRangeValueWithNull = [number, number] | null
// export type NumberPickerRangeOnChange = [number, number]

// interface NumberPickerBase {
// 	disabled?: boolean
// 	className?: string
// 	onError: (value: boolean) => void
// 	aboveZero?: boolean
// }

// export interface NumberPickerStandartProps extends NumberPickerBase {
// 	type?: 'standart'
// 	value: number | [number, number] | null
// 	onChange: (value: number | [number, number]) => void
// }

// export interface NumberPickerRangeProps extends NumberPickerBase {
// 	type: 'range'
// 	value: [number, number] | null
// 	onChange: (value: [number, number]) => void
// }

// export type NumberPickerProps =
// 	| NumberPickerStandartProps
// 	| NumberPickerRangeProps
