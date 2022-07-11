import filtersReducer, { changeFilters, FiltersStoreType } from './filtersSlice'

describe('Filters reducer', () => {
	const initialState: FiltersStoreType = {
		home: [],
		new: [],
		stories: [],
		comments: [],
		polls: [],
		show: [],
		ask: []
	}

	it('filtersReducer should handle initial state', () => {
		expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(initialState)
	})

	it('filtersReducer should handle changeFilters', () => {
		const actual = filtersReducer(
			initialState,
			changeFilters({
				home: [
					{ id: 0, name: 'test', key: 'is', value: new Date('01-01-2022') }
				]
			})
		)

		expect(actual).toEqual({
			home: [{ id: 0, name: 'test', key: 'is', value: new Date('01-01-2022') }],
			new: [],
			stories: [],
			comments: [],
			polls: [],
			show: [],
			ask: []
		})
	})
})
