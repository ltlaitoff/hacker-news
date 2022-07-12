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
				className={'gap-x-2 flex items-center text-gray-300'}
				data-testid='icon'
			>
				{'|'}
				<DownArrow
					className={classNames('fill-gray-400 w-4 h-4', {
						'fill-pink-400': listIsOpened,
						'fill-gray-300': disabled
					})}
				/>
			</span>
		</button>
	)
}

export default SelectBase
