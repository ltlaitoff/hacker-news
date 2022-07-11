import React, { Ref, forwardRef } from 'react'
import classNames from 'classnames'

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'
import { FilterAddingButtonProps } from './FilterAddingButton.interfaces'

const FilterAddingButton = (
	{ onClick, className, ...args }: FilterAddingButtonProps,
	ref: Ref<HTMLButtonElement>
) => {
	return (
		<button
			ref={ref}
			className={classNames(
				'p-2 rounded-full h-8 inline-flex items-center hover:bg-gray-100',
				className
			)}
			onClick={onClick}
			data-testid='button'
			{...args}
		>
			<PlusIcon className='fill-gray-400 h-full mr-2' />
			<span className='text-gray-400'>Add filter</span>
		</button>
	)
}

export default forwardRef<HTMLButtonElement, FilterAddingButtonProps>(
	FilterAddingButton
)
