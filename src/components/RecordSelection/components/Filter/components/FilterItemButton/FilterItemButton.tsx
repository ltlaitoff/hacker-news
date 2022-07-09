import React, { forwardRef, Ref } from 'react'

import { ReactComponent as Cross } from 'assets/icons/cross.svg'

import { FILTER_DATE_FORMAT } from '../../constants'

// XXX: WTF
import { trasformDateIntoFormat } from 'components/DatePicker/DatePickerInput/helpers'
import { FilterItemButtonProps } from './FilterItemButton.interfaces'

// XXX: WTF
const dateFormatter = (value: Date | Date[]): string | null => {
	if (value instanceof Array) {
		return `${trasformDateIntoFormat(
			value[0],
			FILTER_DATE_FORMAT
		)} and ${trasformDateIntoFormat(value[1], FILTER_DATE_FORMAT)}`
	}

	return trasformDateIntoFormat(value, FILTER_DATE_FORMAT)
}

const FilterItemButton = (
	{
		id,
		name,
		filterKey,
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
				<div>{filterKey}</div>
				<div>{dateFormatter(value)}</div>
			</button>

			<button
				onClick={() => onClose(id)}
				className='h-full p-[0.6rem]'
				data-testid='close-button'
			>
				<Cross className='fill-gray-400 h-full' />
			</button>
		</div>
	)
}

export default forwardRef<HTMLDivElement, FilterItemButtonProps>(
	FilterItemButton
)
