import React, { FC, ChangeEvent, useState, SyntheticEvent } from 'react'
import { SearchProps } from './Search.interfaces'
import classNames from 'classnames'
import { ReactComponent as SearchIcon } from 'assets/icons/search-icon.svg'

const Search: FC<SearchProps> = ({ onSubmit, className, ...args }) => {
	const [inputValue, setInputValue] = useState<string>('')

	const [inputError, setInputError] = useState<boolean>(false)

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setInputValue(e.target.value)
		setInputError(false)
	}

	const onFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		if (inputValue.length <= 0 || inputValue.length > 64) {
			setInputError(true)
			return
		}

		onSubmit(inputValue)
		setInputValue('')
	}

	return (
		<form
			className={classNames(
				'rounded-full max-h-10 inline-flex h-10 min-w-[35%] max-w-[75%] items-center',
				className
			)}
			{...args}
			onSubmit={onFormSubmit}
		>
			<input
				className={classNames(
					'shadow-[0_0_15px_-7px] shadow-stone-400 rounded-full pl-4 h-full w-full placeholder:text-slate-400 text-slate-600 blue-focus-visible',
					{
						'focus-visible:outline-rose-600 outline-rose-300 outline-2 outline placeholder:text-rose-500':
							inputError
					}
				)}
				type='text'
				onInput={onInput}
				value={inputValue}
				placeholder={'Search'}
				maxLength={64}
				required
			/>
			<button
				className={classNames(
					'rounded-full -ml-11 h-full max-h-10 p-[0.3rem] duration-500 pink-focus-visible pink-hover-fill disabled:fill-gray-300 disabled:hover:fill-gray-300 fill-slate-400 disabled:hover:drop-shadow-none',
					{
						'fill-rose-400': inputError
					}
				)}
				disabled={inputValue === ''}
			>
				<SearchIcon className={'h-full w-ful'} />
			</button>
		</form>
	)
}

export default Search
