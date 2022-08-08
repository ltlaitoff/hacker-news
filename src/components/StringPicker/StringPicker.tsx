import React, { FC, FormEvent, useState } from 'react'
import classNames from 'classnames'
import { getValueFromEvent } from 'helpers'
import { StringPickerProps } from './StringPicker.interfaces'

const StringPicker: FC<StringPickerProps> = ({
	value,
	onChange,
	disabled,
	onError = () => {},
	className,
	...args
}) => {
	/*
		TODO: Add an onSubmit event to avoid unnecessary re-renders
	*/
	const [inputValue, setInputValue] = useState<string>(value || '')
	const [error, setError] = useState<boolean>(
		value === '' || value === undefined
	)

	const onInput = (e: FormEvent<HTMLInputElement>) => {
		if (disabled) return

		const value = getValueFromEvent(e)

		setInputValue(value)

		if (value.length === 0) {
			onError(true)
			setError(true)

			return
		}

		onChange(value)
		setError(false)
		onError(false)
	}

	const inputClassNames = classNames(
		'relative w-48 text-gray-500 h-10 px-5 py-2 text-left border rounded flex items-center justify-between  blue-focus-visible-border tracking-widest focus:duration-0 shadow-lg focus:text-gray-700',
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
			value={inputValue}
			onInput={onInput}
			disabled={disabled}
			data-error={error}
			data-testid='input'
			{...args}
		/>
	)
}

export default StringPicker
