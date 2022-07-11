import React, { FC } from 'react'
import Filter from './components/Filter'
import { CurrentFiltersItem } from './components/Filter/Filter.interfaces'
import Search from './components/Search'
import { filters } from 'data/filters'
import {
	changeFilters,
	changeSearch,
	FiltersStoreType,
	RequireOnlyOneFilters,
	selectFilters,
	selectSearch,
	SearchesStoreType
} from 'store'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { useLocation } from 'react-router-dom'
import { getRouteNameByPath } from 'routes'

const RecordSelection: FC = () => {
	const location = useLocation()
	const currentPage = getRouteNameByPath(location.pathname)

	if (!currentPage) {
		throw new Error('location pathname error')
	}

	const currentFilters = useAppSelector(state =>
		selectFilters(state, currentPage)
	)

	const currentSearch = useAppSelector(state =>
		selectSearch(state, currentPage)
	)

	const dispatch = useAppDispatch()

	const setCurrentFilters = (array: CurrentFiltersItem[]) => {
		const returnValue: RequireOnlyOneFilters = {
			[currentPage]: array
		} as FiltersStoreType

		dispatch(changeFilters(returnValue))
	}

	const setCurrentSearch = (value: string) => {
		const returnValue = {
			[currentPage]: value
		} as SearchesStoreType

		dispatch(changeSearch(returnValue))
	}

	return (
		<div>
			<Search defaultValue={currentSearch} onSubmit={setCurrentSearch} />
			<Filter
				filters={filters}
				currentFilters={currentFilters}
				onChange={setCurrentFilters}
			/>
		</div>
	)
}

export default RecordSelection
