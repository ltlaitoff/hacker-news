import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import { SelectProps, SelectRecord } from './Select.interfaces'
import { ReactComponent as DownArrow } from 'assets/icons/down-arrow.svg'

const getItemById = (items: SelectRecord[], id: number): SelectRecord[] => {
	return items.filter(item => item.id === id)
}

const Select: FC<SelectProps> = ({
	options,
	onClick,
	onChange,
	disabled,
	defaultSelectId,
	className,
	...args
}) => {
	const [selectedItem, setSelectedItem] = useState<SelectRecord>(
		defaultSelectId ? getItemById(options, defaultSelectId)[0] : options[0]
	)
	const [listIsOpened, setListIsOpened] = useState<boolean>(false)

	useEffect(() => {
		if (!disabled) {
			const onEscPress = (e: KeyboardEvent) => {
				if (e.code === 'Escape') {
					setListIsOpened(false)
				}
			}

			document.addEventListener('keydown', onEscPress)

			return () => {
				document.removeEventListener('keydown', onEscPress)
			}
		}
	})

	const onItemClick = (itemData: SelectRecord) => {
		if (onClick) onClick(itemData.id)

		if (selectedItem.id !== itemData.id) {
			if (onChange) onChange(itemData.id)

			setSelectedItem(itemData)
		}

		setListIsOpened(false)
	}

	const listOpenedToggle = () => {
		if (!disabled) {
			setListIsOpened(currentListOpened => !currentListOpened)
		}
	}

	const mainButtonStyles = classNames(
		'hover:text-cyan-500 relative w-full h-10 px-5 py-2 text-left border rounded flex shadow-lg items-center justify-between duration-200',
		{
			'border-stone-400/20 hover:border-stone-400/30': !listIsOpened,
			'border-stone-400/50 hover:border-stone-400/50': listIsOpened,
			'bg-gray-100/50 text-gray-400 hover:text-gray-400 cursor-default':
				disabled
		}
	)

	const listStyles =
		'top-12 shadow-stone-700/5 absolute flex flex-col w-full py-1 border border-stone-400/20 rounded shadow-lg z-[100] bg-white'

	return (
		<div
			className={classNames('relative w-48 text-gray-500', className)}
			{...args}
		>
			<button
				className={mainButtonStyles}
				onClick={listOpenedToggle}
				tabIndex={0}
				data-testid='main-button'
			>
				{selectedItem.label}

				<span className={'gap-x-2 flex items-center text-gray-300'}>
					{'|'}
					<DownArrow
						className={classNames('fill-gray-400 w-4 h-4', {
							'fill-pink-400': listIsOpened,
							'fill-gray-300': disabled
						})}
					/>
				</span>
			</button>

			{listIsOpened && (
				<div className={listStyles} data-testid='list'>
					{options.map(item => {
						const listItemStyles = classNames(
							'hover:bg-sky-700/10 hover:text-cyan-600 hover:duration-50 p-2',
							{
								'text-pink-400': item.id === selectedItem.id
							}
						)

						return (
							<button
								className={listItemStyles}
								key={item.id}
								onClick={() => onItemClick(item)}
								data-testid='item'
							>
								{item.label}
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}
export default Select
