import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentFiltersItem } from 'components/RecordSelection/components/Filter/Filter.interfaces'
import { RootState } from '../store'

export type FiltersStoreType = {
	value: CurrentFiltersItem[]
}

const initialState: FiltersStoreType = {
	value: []
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		changeFilters: (state, action: PayloadAction<CurrentFiltersItem[]>) => {
			state.value = [...action.payload]
		}
	}
})

export const { changeFilters } = filterSlice.actions

export const selectFilters = (state: RootState) => state.filters.value

export default filterSlice.reducer
