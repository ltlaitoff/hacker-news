import React, { FC, useCallback } from 'react'
import { DatePickerInput } from '..'
import { DateInputProps, onChangeTypes } from '../../DatePicker.interfaces'

const StandartDateInput: FC<DateInputProps> = ({
	format,
	date,
	onSubmit,
	error,
	onError,
	disabled,
	...args
}) => {
	const onDateSubmit = useCallback(
		(value: Date, type: onChangeTypes) => {
			onSubmit([value, value], type)
		},
		[onSubmit]
	)

	return (
		<DatePickerInput
			format={format}
			date={date[0]}
			onSubmit={onDateSubmit}
			error={error}
			onError={onError}
			disabled={disabled}
			data-testid='input'
			{...args}
		/>
	)
}

export default React.memo(StandartDateInput)
