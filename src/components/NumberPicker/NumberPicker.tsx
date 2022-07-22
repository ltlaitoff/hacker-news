import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { isNull } from 'helpers'
import {
	NumberPickerProps,
	NumberPickerRangeValueWithNull,
	NumberPickerStandartValueWithNull,
	NumberSubmitType
} from './NumberPicker.interfaces'
import { StandartNumberInput, RangeNumberInput } from './components'

const getDefaultNumberValue = (
	value: NumberPickerStandartValueWithNull | NumberPickerRangeValueWithNull
): [number, number] => {
	const DEFAULT = 100

	if (isNull(value)) {
		return [DEFAULT, DEFAULT]
	}

	if (value instanceof Array) {
		if (isNull(value[0]) || isNull(value[1])) {
			return [DEFAULT, DEFAULT]
		}

		return value
	}

	return [value, value]
}

const NumberPicker: FC<NumberPickerProps> = ({
	value,
	onChange,
	type,
	disabled,
	onError,
	aboveZero,
	className,
	...args
}: NumberPickerProps) => {
	if (type === undefined) {
		type = 'standart'
	}

	if (onError === undefined) {
		onError = () => {}
	}

	if (aboveZero === undefined) {
		aboveZero = false
	}

	const [currentValue, setCurrentValue] = useState<[number, number]>(
		getDefaultNumberValue(value)
	)

	const checkNumbersOrder = (data: [number, number]): [number, number] => {
		if (data[0] > data[1]) {
			return [data[1], data[0]]
		}

		return data
	}

	const onSubmit = (
		dataValues: [number, number],
		dataType: NumberSubmitType
	) => {
		if (disabled) return

		const dataInput = checkNumbersOrder(dataValues)

		if (dataInput[0] !== currentValue[0] || dataInput[1] !== currentValue[1]) {
			setCurrentValue(dataInput)
		}

		if (type === 'standart') {
			if (value instanceof Array) {
				if (dataInput[0] !== value[0] || dataInput[1] !== value[0]) {
					onChange(dataInput)
				}

				return
			}

			onChange(dataInput[0])
			return
		}

		onChange(dataInput)
	}

	return (
		<div className={classNames(className)} data-testid='picker' {...args}>
			{type === 'standart' ? (
				<StandartNumberInput
					value={currentValue}
					onSubmit={onSubmit}
					disabled={disabled}
					onError={onError}
					aboveZero={aboveZero}
					data-testid='standart-input'
				/>
			) : (
				<RangeNumberInput
					value={currentValue}
					onSubmit={onSubmit}
					onError={onError}
					aboveZero={aboveZero}
					disabled={disabled}
				/>
			)}
		</div>
	)
}

export default NumberPicker
