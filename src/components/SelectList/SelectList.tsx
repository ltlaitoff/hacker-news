import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { SelectListProps } from './SelectList.interfaces'

const SelectList: FC<SelectListProps> = ({
	show,
	options,
	onItemClick,
	selectedItem,
	shadowDisabled,
	className,
	...args
}) => {
	const [currentSelectedItem, setCurrentSelectedItem] = useState<number>(0)

	const onListItemMouseOver = (id: number) => {
		setCurrentSelectedItem(id)
	}

	if (!show) return null

	return (
		<div
			className={classNames(
				'shadow-stone-700/5 absolute flex flex-col w-full py-1 px-1 border shadow border-stone-400/20 rounded z-[100] bg-white',
				{ 'shadow-lg': !shadowDisabled },
				className
			)}
			data-testid='list'
			{...args}
		>
			{options.map(item => {
				const id = item.id
				const listItemStyles = classNames('p-2', {
					'text-pink-400': id === selectedItem.id,
					'bg-sky-700/10': currentSelectedItem === id,
					'text-cyan-600': currentSelectedItem === id && id !== selectedItem.id
				})

				return (
					<button
						className={listItemStyles}
						key={id}
						onClick={() => onItemClick(item)}
						onMouseOver={() => onListItemMouseOver(id)}
						data-testid='item'
					>
						{item.label}
					</button>
				)
			})}
		</div>
	)
}

export default SelectList
