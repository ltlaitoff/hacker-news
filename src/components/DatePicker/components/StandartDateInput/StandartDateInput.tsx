import React, { FC, useCallback } from 'react'
import { DatePickerInput, DatePickerInputOnSubmitType } from '..'
import { DateInputProps } from '../../DatePicker.interfaces'

const StandartDateInput: FC<DateInputProps> = ({
	date,
	format,
	onSubmit,
	onError,
	disabled,
	...args
}) => {
	const onDateSubmit = useCallback(
		(value: Date, type: DatePickerInputOnSubmitType) => {
			onSubmit([value, value], type)
		},
		[onSubmit]
	)

	return (
		<DatePickerInput
			date={date[0]}
			format={format}
			onSubmit={onDateSubmit}
			onError={onError}
			disabled={disabled}
			data-testid='input'
			{...args}
		/>
	)
}

export default StandartDateInput
