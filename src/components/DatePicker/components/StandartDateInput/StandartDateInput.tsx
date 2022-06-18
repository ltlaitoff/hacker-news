import React, { FC } from 'react'
import DatePickerInput, {
	DatePickerInputOnSubmitType
} from '../../DatePickerInput'

import { DateInputProps } from '../../interfaces'

const StandartDateInput: FC<DateInputProps> = ({
	date,
	format,
	onSubmit,
	disabled,
	...args
}) => {
	const onDateSubmit = (value: Date, type: DatePickerInputOnSubmitType) => {
		onSubmit([value, value], type)
	}

	return (
		<DatePickerInput
			date={date[0]}
			format={format}
			onSubmit={onDateSubmit}
			disabled={disabled}
			data-testid='input'
			{...args}
		/>
	)
}

export default StandartDateInput
