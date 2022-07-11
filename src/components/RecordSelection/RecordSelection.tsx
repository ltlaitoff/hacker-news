import React, { FC, useState } from 'react'
import Filter from './components/Filter'
import { CurrentFiltersItem } from './components/Filter/Filter.interfaces'
import Search from './components/Search'
import { filters } from 'data/filters'
import {
	changeFilters,
	FiltersStoreType,
	RequireOnlyOneFilters,
	selectFilters
} from 'store'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { useLocation } from 'react-router-dom'
import { getRouteNameByPath } from 'routes'

const RecordSelection: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')

	const location = useLocation()
	const currentPage = getRouteNameByPath(location.pathname)

	if (!currentPage) {
		throw new Error('location pathname error')
	}

	const currentFilters = useAppSelector(state =>
		selectFilters(state, currentPage)
	)

	const dispatch = useAppDispatch()

	const setCurrentFilters = (array: CurrentFiltersItem[]) => {
		const returnValue: RequireOnlyOneFilters = {
			[currentPage]: array
		} as FiltersStoreType

		dispatch(changeFilters(returnValue))
	}

	return (
		<div>
			<Search defaultValue={searchValue} onSubmit={setSearchValue} />
			<Filter
				filters={filters}
				currentFilters={currentFilters}
				onChange={setCurrentFilters}
			/>
		</div>
	)
}

export default RecordSelection
