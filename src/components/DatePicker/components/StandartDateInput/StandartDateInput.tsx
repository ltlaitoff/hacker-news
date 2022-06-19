import React, { FC } from 'react'
import DatePickerInput, {
	DatePickerInputOnSubmitType
} from '../../DatePickerInput'

import { DateInputProps } from '../../interfaces'

const StandartDateInput: FC<DateInputProps> = ({
	date,
	format,
	onSubmit,
	onError,
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
			onError={onError}
			disabled={disabled}
			data-testid='input'
			{...args}
		/>
	)
}

export default StandartDateInput
