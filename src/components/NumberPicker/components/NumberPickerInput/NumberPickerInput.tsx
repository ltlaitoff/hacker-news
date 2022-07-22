import React, { useState, useEffect, KeyboardEvent, FC, FormEvent } from 'react'
import { getValueFromEvent, isEnterKey } from 'helpers'
import classNames from 'classnames'
import { NumberPickerInputProps } from './NumberPickerInput.interfaces'
import { NumberSubmitType } from '../../NumberPicker.interfaces'

const NumberPickerInput: FC<NumberPickerInputProps> = ({
	value = 100,
	disabled,
	onSubmit,
	aboveZero,
	onError,
	...args
}) => {
	const [inputValue, setInputValue] = useState<string>(String(value))
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		if (inputValue.length === 0) {
			setError(true)
			onError(true)
			return
		}

		const number = Number(inputValue)
		const checkErrorNumber = isFinite(number)

		if (!checkErrorNumber) {
			setError(true)
			onError(true)
			return
		}

		console.log(aboveZero, number, checkErrorNumber)
		if (aboveZero && number < 0) {
			setError(true)
			onError(true)
			return
		}
	}, [inputValue, onError, aboveZero])

	const numberSubmit = (value: string, type: NumberSubmitType) => {
		if (disabled) return

		const number = Number(value)
		const checkErrorNumber = isFinite(number)

		if (!checkErrorNumber) {
			setError(true)
			onError(true)
			return
		}

		onError(false)
		onSubmit(number, type)
	}

	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		const value = getValueFromEvent(e)

		if (error) setError(false)

		setInputValue(value)
	}

	const onBlur = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		numberSubmit(getValueFromEvent(e), 'blur')
	}

	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return

		if (isEnterKey(e.key)) {
			numberSubmit(getValueFromEvent(e), 'enterKey')
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

export default NumberPickerInput
