import React, { useState, useEffect, KeyboardEvent, FC, FormEvent } from 'react'
import classNames from 'classnames'
import {
	getValueFromEvent,
	isEnterKey,
	isValidDate,
	isFalse,
	isNull
} from 'helpers'

import { DatePickerInputProps } from './DatePickerInput.interfaces'
import { checkStringDateOnErrors, trasformDateIntoFormat } from './helpers'
import { onChangeTypes } from '../../DatePicker.interfaces'

const DatePickerInput: FC<DatePickerInputProps> = ({
	format,
	date,
	onSubmit,
	error,
	onError,
	disabled,
	...args
}) => {
	const [inputValue, setInputValue] = useState<string>(
		trasformDateIntoFormat(date, format) || ''
	)

	useEffect(() => {
		const inputValue = trasformDateIntoFormat(date, format)

		if (isNull(inputValue)) {
			onError(true)
			return
		}

		setInputValue(inputValue)

		const checkErrorDate = checkStringDateOnErrors(inputValue, format)

		if (isNull(checkErrorDate) || isFalse(isValidDate(checkErrorDate))) {
			onError(true)
		}
	}, [date, format, onError])

	const dateSubmit = (value: string, type: onChangeTypes) => {
		if (disabled) return

		const date = checkStringDateOnErrors(value, format)

		if (isNull(date) || isFalse(isValidDate(date))) {
			onError(true)
			return
		}

		onError(false)
		onSubmit(date, type)
	}

	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		setInputValue(getValueFromEvent(e))

		if (error) {
			onError(false)
		}
	}

	const onBlur = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		dateSubmit(getValueFromEvent(e), onChangeTypes.BLUR)
	}

	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return

		if (isEnterKey(e.key)) {
			dateSubmit(getValueFromEvent(e), onChangeTypes.ENTER_KEY)
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
