import React, { useState, KeyboardEvent, FC, FormEvent } from 'react'
import classNames from 'classnames'

import { getValueFromEvent, isEnterKey } from 'helpers'

import { NumberPickerInputProps } from './NumberPickerInput.interfaces'

import { onChangeType } from '../../NumberPicker.interfaces'
import { getValidNumberFromString } from './helpers'

const NumberPickerInput: FC<NumberPickerInputProps> = ({
	value,
	onSubmit,
	error,
	onError,
	disabled,
	max,
	min,
	className,
	...args
}) => {
	const [inputValue, setInputValue] = useState<string>(String(value))

	const numberSubmit = (type: onChangeType) => {
		if (disabled) return

		const validNumber = getValidNumberFromString(inputValue, {
			min: min,
			max: max
		})

		if (validNumber === null) {
			onError(true)
			return
		}

		onSubmit(validNumber, type)
	}

	const onInput = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		const value = getValueFromEvent(e)
		setInputValue(value)

		const validNumber = getValidNumberFromString(value, {
			min: min,
			max: max
		})

		if (validNumber === null) {
			onError(true)
			return
		}

		if (error) {
			onError(false)
		}
	}

	const onBlur = () => {
		numberSubmit(onChangeType.BLUR)
	}

	const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isEnterKey(e.key)) {
			numberSubmit(onChangeType.ENTER_KEY)
		}
	}

	const inputClassNames = classNames(
		'remove-arrows-input-number relative text-gray-500 h-10 px-5 py-2 text-left border flex items-center justify-between blue-focus-visible-border tracking-widest focus:duration-0 focus:text-gray-700',
		{
			'border-2 border-red-400 focus-visible:outline-none focus-visible:border-red-800':
				error,
			'text-gray-400 bg-gray-100': disabled
		},
		className
	)

	return (
		<input
			className={inputClassNames}
			type='number'
			value={inputValue}
			onInput={onInput}
			onBlur={onBlur}
			onKeyPress={onKeyPress}
			disabled={disabled}
			max={max}
			min={min}
			data-error={error}
			data-testid='input'
			{...args}
		/>
	)
}

export default React.memo(NumberPickerInput)
