import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageNames } from 'routes'
import { Entries, FilterReceived, RequireOnlyOne } from 'typescript'
import { RootState } from '../store'

export type FiltersStoreType = Record<PageNames, FilterReceived[]>

export type RequireOnlyOneFilters = RequireOnlyOne<FiltersStoreType>

const initialState: FiltersStoreType = {
	// TODO: Add on every page tags by default
	home: [],
	new: [],
	stories: [],
	comments: [],
	polls: [],
	show: [],
	ask: []
} as FiltersStoreType

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		changeFilters: (state, action: PayloadAction<RequireOnlyOneFilters>) => {
			const [name, value] = (
				Object.entries(action.payload) as Entries<FiltersStoreType>
			)[0]

			state[name] = [...value]
		}
	}
})

export const { changeFilters } = filterSlice.actions

export const selectFilters = createSelector(
	[
		(state: RootState) => state.filters,
		(state: RootState, page: PageNames) => page
	],
	(filters, page) => {
		return filters[page]
	}
)

export default filterSlice.reducer
