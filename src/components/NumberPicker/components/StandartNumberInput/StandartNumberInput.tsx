import React, { FC, useCallback } from 'react'
import { NumberPickerInput } from '..'
import {
	NumberInputProps,
	NumberSubmitType
} from '../../NumberPicker.interfaces'

const StandartDateInput: FC<NumberInputProps> = ({
	value,
	onSubmit,
	onError,
	aboveZero,
	disabled,
	...args
}) => {
	const onNumberSubmit = useCallback(
		(data: number, type: NumberSubmitType) => {
			onSubmit([data, data], type)
		},
		[onSubmit]
	)

	return (
		<NumberPickerInput
			value={value[0]}
			onSubmit={onNumberSubmit}
			onError={onError}
			aboveZero={aboveZero}
			disabled={disabled}
			data-testid='input'
			{...args}
		/>
	)
}

export default StandartDateInput
