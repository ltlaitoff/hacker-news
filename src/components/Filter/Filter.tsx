import React, { FC } from 'react'
import { FilterProps } from './Filter.interfaces'
import classNames from 'classnames'

const Filter: FC<FilterProps> = ({ className, ...args }) => {
	return (
		<div className={classNames(className)} {...args}>
			Filter
		</div>
	)
}

export default Filter
