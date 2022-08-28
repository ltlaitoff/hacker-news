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
import {
	DatePickerInputOnSubmitType,
	DatePickerInputProps
} from './DatePickerInput.interfaces'
import { checkStringDateOnErrors } from './helpers'

const DatePickerInput: FC<DatePickerInputProps> = ({
	date,
	format,
	disabled,
	onSubmit,
	onError,
	...args
}) => {
	const [inputValue, setInputValue] = useState<string>(
		trasformDateIntoFormat(date, format) || ''
	)
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		const inputValue = trasformDateIntoFormat(date, format)

		if (isNull(inputValue)) {
			setError(true)
			onError(true)
			return
		}

		setInputValue(inputValue)

		const checkErrorDate = checkStringDateOnErrors(inputValue, format)

		if (isNull(checkErrorDate) || isFalse(isValidDate(checkErrorDate))) {
			setError(true)
			onError(true)
		}
	}, [date, format, onError])

	const dateSubmit = (value: string, type: DatePickerInputOnSubmitType) => {
		if (disabled) return

		const date = checkStringDateOnErrors(value, format)

		if (isNull(date) || isFalse(isValidDate(date))) {
			setError(true)
			onError(true)
			return
		}

		onError(false)
		onSubmit(date, type)
	}

	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		const value = getValueFromEvent(e)

		if (error) setError(false)

		setInputValue(value)
	}

	const onBlur = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		dateSubmit(getValueFromEvent(e), 'blur')
	}

	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return

		if (isEnterKey(e.key)) {
			dateSubmit(getValueFromEvent(e), 'enterKey')
		}
	}

	const inputClassNames = classNames(
		'relative w-48 text-gray-500 h-10 px-5 py-2 text-left border rounded flex items-center justify-between  blue-focus-visible-border tracking-widest focus:duration-0 shadow-lg focus:text-gray-700',
		{
			'border-2 border-red-400 focus-visible:outline-none focus-visible:border-red-800':
				error,
			'text-gray-400 bg-gray-100': disabled
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
			disabled={disabled}
			data-error={error}
			data-testid='input'
			{...args}
		/>
	)
}

export default React.memo(DatePickerInput)
