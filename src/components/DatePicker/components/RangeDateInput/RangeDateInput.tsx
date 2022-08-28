import React, { FC, useCallback } from 'react'
import { DatePickerInput } from '..'
import { DateInputProps, onChangeTypes } from '../../DatePicker.interfaces'

const DateRangePicker: FC<DateInputProps> = ({
	format,
	date,
	onSubmit,
	error,
	onError,
	disabled,
	...args
}) => {
	const onFirstDateSubmit = useCallback(
		(value: Date, type: onChangeTypes) => {
			onSubmit([value, date[1]], type)
		},
		[date, onSubmit]
	)

	const onSecondDateSubmit = useCallback(
		(value: Date, type: onChangeTypes) => {
			onSubmit([date[0], value], type)
		},
		[date, onSubmit]
	)

	return (
		<div data-testid='range' {...args}>
			<div className='gap-x-4 justify-items-end flex'>
				<DatePickerInput
					format={format}
					date={date[0]}
					onSubmit={onFirstDateSubmit}
					error={error}
					onError={onError}
					disabled={disabled}
					data-testid='first-input'
				/>
				<div className='self-center'>and</div>
				<DatePickerInput
					format={format}
					date={date[1]}
					onSubmit={onSecondDateSubmit}
					error={error}
					onError={onError}
					disabled={disabled}
					data-testid='second-input'
				/>
			</div>
		</div>
	)
}

export default React.memo(DateRangePicker)
