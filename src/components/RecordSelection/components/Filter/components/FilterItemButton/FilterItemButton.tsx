import React, { forwardRef, Ref } from 'react'
import { ReactComponent as Cross } from 'assets/icons/cross.svg'
import { FilterItemButtonProps } from './FilterItemButton.interfaces'
import { formatFilterValueForOutput } from '../../helpers'

const FilterItemButton = (
	{
		id,
		name,
		type,
		filtration,
		value,
		onClose,
		onClick,
		className,
		...args
	}: FilterItemButtonProps,
	ref: Ref<HTMLDivElement>
) => {
	return (
		<div
			className='hover:bg-gray-300 inline-flex items-center h-8 pl-1 pr-2 bg-gray-100 rounded-full'
			ref={ref}
			data-testid='wrapper'
			{...args}
		>
			<button
				className='gap-x-1 flex items-center h-full p-2 text-gray-600'
				onClick={() => onClick(id)}
				data-testid='content-button'
			>
				<div>{name}</div>
				<div>{filtration}</div>
				<div>{formatFilterValueForOutput(value)}</div>
			</button>

			<button
				onClick={() => onClose(id)}
				className='h-full p-[0.6rem]'
				data-testid='close-button'
			>
				<Cross
					className='fill-gray-400 h-full'
					data-testid='close-button-icon'
				/>
			</button>
		</div>
	)
}

export default forwardRef<HTMLDivElement, FilterItemButtonProps>(
	FilterItemButton
)
