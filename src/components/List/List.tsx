import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { ListProps } from './List.interfaces'
import { useOutsideClick } from 'hooks'

const List: FC<ListProps> = ({
	options,
	onItemClick,
	selectedItem,
	shadowDisabled,
	onOutsideClick,
	className,
	style,
	...args
}) => {
	const [currentSelectedItem, setCurrentSelectedItem] = useState<number>(0)

	const onListItemMouseOver = (id: number) => {
		setCurrentSelectedItem(id)
	}

	const outsideRef = useOutsideClick(
		onOutsideClick
	) as React.RefObject<HTMLUListElement>

	return (
		<ul
			className={classNames(
				'shadow-stone-700/5 absolute flex flex-col w-full py-1 px-1 border shadow border-stone-400/20 rounded z-[100] bg-white',
				{ 'shadow-lg': !shadowDisabled },
				className
			)}
			ref={outsideRef}
			data-testid='list'
			{...args}
		>
			{options.map(item => {
				const id = item.id
				const listItemStyles = classNames('px-2 py-1 w-full', {
					'text-pink-400': id === selectedItem?.id,
					'bg-sky-700/10': currentSelectedItem === id,
					'text-cyan-600': currentSelectedItem === id && id !== selectedItem?.id
				})

				return (
					<li key={id} className='w-full'>
						<button
							className={listItemStyles}
							onClick={() => onItemClick(item)}
							onMouseOver={() => onListItemMouseOver(id)}
							style={style}
							data-testid='item'
						>
							{item.label}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

export default List
