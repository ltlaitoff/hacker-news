import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageNames } from 'routes'
import { Entries, RequireOnlyOne } from 'typescript'
import { RootState } from '..'

export type SearchesStoreType = Record<PageNames, string>

const initialState: SearchesStoreType = {
	home: '',
	new: '',
	stories: '',
	comments: '',
	polls: '',
	show: '',
	ask: ''
}

const searchesSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeSearch: (
			state,
			action: PayloadAction<RequireOnlyOne<SearchesStoreType>>
		) => {
			const [name, value] = (
				Object.entries(action.payload) as Entries<SearchesStoreType>
			)[0]

			state[name] = value
		}
	}
})

export const { changeSearch } = searchesSlice.actions

export const selectSearch = createSelector(
	[
		(state: RootState) => state.searches,
		(state: RootState, page: PageNames) => page
	],
	(searches, page) => {
		return searches[page]
	}
)

export default searchesSlice.reducer
