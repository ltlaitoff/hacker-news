import React, { FC, useState } from 'react'
import Filter from './components/Filter'
import { CurrentFiltersItem } from './components/Filter/Filter.interfaces'
import Search from './components/Search'
import { filters } from 'data/filters'
import { changeFilters, selectFilters } from 'store'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'

const RecordSelection: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')

	const currentFilters = useAppSelector(selectFilters)
	const dispatch = useAppDispatch()

	const setCurrentFilters = (array: CurrentFiltersItem[]) => {
		dispatch(changeFilters(array))
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
