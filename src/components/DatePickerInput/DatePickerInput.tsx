import React, { useState, useEffect, KeyboardEvent, FC, FormEvent } from 'react'
import { trasformDateIntoFormat } from './helpers/trasformDateIntoFormat'
import {
	getValueFromEvent,
	isEnterKey,
	isValidDate,
	isFalse,
	isNull
} from 'helpers'

import classNames from 'classnames'
import { DatePickerInputProps } from './DatePickerInput.interfaces'
import { checkStringDateOnErrors } from './helpers'

const DatePickerInput: FC<DatePickerInputProps> = ({
	date,
	format,
	onSubmit
}) => {
	const [inputValue, setInputValue] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		const inputValue = trasformDateIntoFormat(date, format)

		if (isNull(inputValue)) {
			setError(true)
			return
		}

		setInputValue(inputValue)

		const checkErrorDate = checkStringDateOnErrors(inputValue, format)

		if (isNull(checkErrorDate) || isFalse(isValidDate(checkErrorDate))) {
			setError(true)
		}
	}, [date, format])

	const dateSubmit = (value: string) => {
		const date = checkStringDateOnErrors(value, format)

		if (isNull(date) || isFalse(isValidDate(date))) {
			setError(true)
			return
		}

		onSubmit(date)
	}

	const onChange = (e: FormEvent<HTMLInputElement>) => {
		const value = getValueFromEvent(e)

		if (error) setError(false)

		setInputValue(value)
	}

	const onBlur = (e: FormEvent<HTMLInputElement>) => {
		dateSubmit(getValueFromEvent(e))
	}

	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isEnterKey(e.key)) {
			dateSubmit(getValueFromEvent(e))
		}
	}

	const inputClassNames = classNames(
		'relative w-48 text-gray-500 h-10 px-5 py-2 text-left border rounded flex items-center justify-between  blue-focus-visible-border tracking-widest focus:duration-0 shadow-lg focus:text-gray-700',
		{
			'border-2 border-red-400 focus-visible:outline-none focus-visible:border-red-800':
				error
		}
	)

	return (
		<input
			className={inputClassNames}
			type='text'
			value={inputValue}
			onChange={onChange}
			onBlur={onBlur}
			onKeyPress={onKeyPress}
			data-error={error}
			data-testid='input'
		/>
	)
}

export default DatePickerInput
