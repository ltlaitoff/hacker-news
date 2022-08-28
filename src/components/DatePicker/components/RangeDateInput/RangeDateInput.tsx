import React, { FC } from 'react'
import { DatePickerInput, DatePickerInputOnSubmitType } from '..'
import { DateInputProps } from '../../DatePicker.interfaces'

const DateRangePicker: FC<DateInputProps> = ({
	date,
	format,
	onSubmit,
	disabled,
	onError,
	...args
}) => {
	const onFirstDateSubmit = (
		value: Date,
		type: DatePickerInputOnSubmitType
	) => {
		onSubmit([value, date[1]], type)
	}

	const onSecondDateSubmit = (
		value: Date,
		type: DatePickerInputOnSubmitType
	) => {
		onSubmit([date[0], value], type)
	}

	return (
		<div data-testid='range' {...args}>
			<div className='gap-x-4 justify-items-end flex'>
				<DatePickerInput
					date={date[0]}
					format={format}
					onSubmit={onFirstDateSubmit}
					onError={onError}
					disabled={disabled}
					data-testid='first-input'
				/>
				<div className='self-center'>and</div>
				<DatePickerInput
					date={date[1]}
					format={format}
					onSubmit={onSecondDateSubmit}
					onError={onError}
					disabled={disabled}
					data-testid='second-input'
				/>
			</div>
		</div>
	)
}

export default DateRangePicker
