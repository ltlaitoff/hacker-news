import React, { FC } from 'react'
import { ReactComponent as DownArrow } from 'assets/icons/down-arrow.svg'
import classNames from 'classnames'
import { SelectBaseProps } from './SelectBase.interfaces'

const SelectBase: FC<SelectBaseProps> = ({
	onClick,
	listIsOpened,
	disabled,
	shadowDisabled,
	selectedItem,
	className,
	...args
}) => {
	const onButtonClick = () => {
		if (disabled) return

		onClick()
	}

	return (
		<button
			className={classNames(
				'hover:text-cyan-500 relative w-full h-10 px-5 py-2 text-left border rounded flex items-center justify-between duration-200',
				{
					'border-stone-400/20 hover:border-stone-400/30': !listIsOpened,
					'border-stone-400/50 hover:border-stone-400/50': listIsOpened,
					'bg-gray-100/50 text-gray-400 hover:text-gray-400 cursor-default':
						disabled,
					'shadow-lg': !shadowDisabled
				}
			)}
			onClick={onButtonClick}
			data-testid='button'
			{...args}
		>
			<div data-testid='selectedItem' key={selectedItem.id}>
				{selectedItem.label}
			</div>

			<span
				className={classNames(
					'gap-x-2 flex items-center relative text-gray-300 before:content-[""] before:h-full before:w-[0.06em] before:rounded before:absolute before:-left-2 before:bg-slate-400',
					{
						'before:bg-pink-400': listIsOpened,
						'before:bg-gray-300': disabled
					}
				)}
				data-testid='icon-span'
			>
				<DownArrow
					className={classNames('fill-gray-400 w-4 h-4', {
						'fill-pink-400': listIsOpened,
						'fill-gray-300': disabled
					})}
					data-testid='icon'
				/>
			</span>
		</button>
	)
}

export default SelectBase
