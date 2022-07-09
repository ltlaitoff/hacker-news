import React, { FC, ChangeEvent, useState, SyntheticEvent } from 'react'
import { SearchProps } from './Search.interfaces'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from 'assets/icons/search-icon.svg'
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg'
import { checkInputValueOnError } from './helpers'
import { MAX_INPUT_LENGTH } from './constants'

const Search: FC<SearchProps> = ({
	defaultValue,
	onSubmit,
	className,
	...args
}) => {
	const [inputValue, setInputValue] = useState<string>(defaultValue || '')
	const [inputError, setInputError] = useState<boolean>(false)

	const searchClassNames = {
		form: classNames(
			'rounded-full max-h-10 inline-flex h-10 min-w-[35%] max-w-[75%] items-center relative shadow-[0_0_15px_-7px] shadow-stone-400',
			className
		),

		input: classNames(
			'rounded-l-full pl-4 h-full w-full placeholder:text-slate-400 text-slate-600 blue-focus-visible',
			{
				'focus-visible:outline-rose-600 outline-rose-300 outline-2 outline placeholder:text-rose-500':
					inputError
			}
		),

		wrapper: classNames('flex h-full gap-x-2 p-[0.3rem] right-2 top-0 '),

		buttons: classNames(
			'h-full duration-500 pink-focus-visible pink-hover-fill disabled:fill-gray-300 disabled:hover:fill-gray-300 fill-slate-400 disabled:hover:drop-shadow-none',
			{
				'fill-rose-400': inputError
			}
		),

		submitButton() {
			return classNames(this.buttons)
		},

		submitButtonIcon: 'h-full w-full',

		deleteButton() {
			return classNames('p-[0.4rem]', this.buttons)
		},

		deleteButtonIcon: classNames('h-full w-full')
	}

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		checkInputValueOnError(e.target.value, setInputError)

		setInputValue(e.target.value)
	}

	const onFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault()

		if (checkInputValueOnError(inputValue, setInputError)) {
			return
		}

		onSubmit(inputValue)
	}

	const onFormReset = (e: SyntheticEvent) => {
		e.preventDefault()

		setInputError(false)
		setInputValue('')
	}

	return (
		<form
			className={searchClassNames.form}
			onSubmit={onFormSubmit}
			onReset={onFormReset}
			data-testid='form'
			{...args}
		>
			<input
				className={searchClassNames.input}
				type='text'
				onInput={onInput}
				value={inputValue}
				placeholder={'Search'}
				maxLength={MAX_INPUT_LENGTH}
				required
				data-testid='input'
				data-error={inputError}
			/>
			<div className={searchClassNames.wrapper}>
				<button
					className={searchClassNames.deleteButton()}
					type='reset'
					data-testid='reset-button'
				>
					<CrossIcon
						className={searchClassNames.deleteButtonIcon}
						data-testid='reset-icon'
					/>
				</button>

				<button
					className={searchClassNames.submitButton()}
					type='submit'
					disabled={inputError}
					data-testid='submit-button'
				>
					<SearchIcon
						className={searchClassNames.submitButtonIcon}
						data-testid='submit-icon'
					/>
				</button>
			</div>
		</form>
	)
}

export default Search
