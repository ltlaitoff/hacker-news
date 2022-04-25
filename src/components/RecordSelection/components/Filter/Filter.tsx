import React, { FC, useState } from 'react'
import { FilterProps } from './Filter.interfaces'
import classNames from 'classnames'

import { FILTERS, Filter as FilterRecordType } from 'data/filters'
import FilterAddingButton from './components/FilterAddingButton'
import SelectFilterWindow from './components/SelectFilterWindow'

const Filter: FC<FilterProps> = ({ className, ...args }) => {
	const [currentFilters, setCurrentFilters] = useState<FilterRecordType[]>()
	const [viewWindowSelectFilter, setViewWindowSelectFilter] =
		useState<boolean>(false)
	const [viewWindowFilterDetails, setViewWindowFilterDetails] =
		useState<boolean>(false)

	const onFilterAddingButtonClick = () => {
		setViewWindowSelectFilter(true)
		console.log('%cFilter.tsx line:12 object', 'color: #007acc;', FILTERS)
	}

	const onSelectFilter = () => {
		console.log('%cFilter.tsx line:22 object', 'color: #007acc;')
	}

	return (
		<div className={classNames(className)} {...args}>
			<FilterAddingButton onClick={onFilterAddingButtonClick} />
			{viewWindowSelectFilter && (
				<SelectFilterWindow filters={FILTERS} onSelectFilter={onSelectFilter} />
			)}
		</div>
	)
}

export default Filter
