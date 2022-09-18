import React, { FC } from 'react'
import {
	NumberPickerBaseType,
	NumberPickerRangeProps,
	onChangeType
} from './NumberPicker.interfaces'
import { DEFAULT } from './constants'
import NumberPicker from './NumberPicker'
import { getOrderedNumbers } from 'helpers'

const NumberPickerRange: FC<NumberPickerRangeProps> = ({
	value,
	onChange,
	error,
	onError = () => {},
	disabled,
	max = DEFAULT.MAX,
	min = DEFAULT.MIN,
	className,
	...props
}) => {
	const onFirstChange = (
		currentValue: NumberPickerBaseType,
		type: onChangeType
	) => {
		onChange(getOrderedNumbers(currentValue, value[1]), type)
	}

	const onSecondChange = (
		currentValue: NumberPickerBaseType,
		type: onChangeType
	) => {
		onChange(getOrderedNumbers(currentValue, value[0]), type)
	}

	return (
		<div className='gap-x-4 justify-items-end flex' {...props}>
			<NumberPicker
				value={value[0]}
				onChange={onFirstChange}
				error={error}
				onError={onError}
				disabled={disabled}
				max={max}
				min={min}
			/>
			<div className='self-center'>and</div>
			<NumberPicker
				value={value[1]}
				onChange={onSecondChange}
				error={error}
				onError={onError}
				disabled={disabled}
				max={max}
				min={min}
			/>
		</div>
	)
}

export default React.memo(NumberPickerRange)
