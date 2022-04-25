import React, { FC } from 'react'
import { FilterAddingButtonProps } from './FilterAddingButton.interfaces'

const FilterAddingButton: FC<FilterAddingButtonProps> = ({
	onClick,
	className,
	...args
}) => {
	return (
		<div className={className} {...args}>
			<button onClick={onClick}>+</button>
		</div>
	)
}

export default FilterAddingButton
