import React, { FC } from 'react'
import DatePickerInput from '../../DatePickerInput'
import { DatePickerInputOnSubmitType } from '../../DatePickerInput/DatePickerInput.interfaces'
import { DateInputProps } from '../../interfaces'

/* 
	[ ] DateRangePicker includes two inputs
	[ ] On change value on first and press enter - onSubmit should be called with ...
	[ ] On change value on second and press enter - onSubmit should be called with ...
	[ ] 
	[ ] 
*/

const DateRangePicker: FC<DateInputProps> = ({
	date,
	format,
	onSubmit,
	disabled,
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
					disabled={disabled}
					data-testid='first-input'
				/>
				<div className='self-center'>and</div>
				<DatePickerInput
					date={date[1]}
					format={format}
					onSubmit={onSecondDateSubmit}
					disabled={disabled}
					data-testid='second-input'
				/>
			</div>
		</div>
	)
}

export default DateRangePicker
