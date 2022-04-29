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
			onClick={onClick}
			tabIndex={0}
			{...args}
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
	)
}

export default SelectBase
