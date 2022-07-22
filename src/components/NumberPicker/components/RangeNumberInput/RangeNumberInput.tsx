import React, { FC } from 'react'
import { NumberPickerInput } from '..'
import {
	NumberSubmitType,
	NumberInputProps
} from '../../NumberPicker.interfaces'

const DateRangePicker: FC<NumberInputProps> = ({
	value,
	onSubmit,
	disabled,
	aboveZero,
	onError,
	...args
}) => {
	const onFirstDateSubmit = (data: number, type: NumberSubmitType) => {
		onSubmit([data, value[1]], type)
	}

	const onSecondDateSubmit = (data: number, type: NumberSubmitType) => {
		onSubmit([value[0], data], type)
	}

	return (
		<div data-testid='range' {...args}>
			<div className='gap-x-4 justify-items-end flex'>
				<NumberPickerInput
					value={value[0]}
					onSubmit={onFirstDateSubmit}
					onError={onError}
					disabled={disabled}
					aboveZero={aboveZero}
					data-testid='first-input'
				/>
				<div className='self-center'>and</div>
				<NumberPickerInput
					value={value[1]}
					onSubmit={onSecondDateSubmit}
					onError={onError}
					disabled={disabled}
					aboveZero={aboveZero}
					data-testid='second-input'
				/>
			</div>
		</div>
	)
}

export default DateRangePicker
