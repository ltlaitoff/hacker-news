export enum onChangeType {
	BLUR = 'blur',
	ENTER_KEY = 'enterKey',
	INTERVAL = 'interval'
}

export enum stepType {
	UP = 'up',
	DOWN = 'down'
}

export type NumberPickerBaseType = number
export type NumberPickerBaseRangeType = [
	NumberPickerBaseType,
	NumberPickerBaseType
]

interface NumberPickerBase {
	error: boolean
	onError?: (value: boolean) => void
	disabled?: boolean
	className?: string
	max?: number
	min?: number
}

export interface NumberPickerProps extends NumberPickerBase {
	value: NumberPickerBaseType
	onChange: (value: NumberPickerBaseType, type: onChangeType) => void
}

export interface NumberPickerRangeProps extends NumberPickerBase {
	value: NumberPickerBaseRangeType
	onChange: (value: NumberPickerBaseRangeType, type: onChangeType) => void
}
