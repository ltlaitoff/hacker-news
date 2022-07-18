import filtersReducer, { changeFilters, FiltersStoreType } from './filtersSlice'
import { FilterBaseName, FilterBaseType } from 'typescript/filters/filters'

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
					{
						id: 0,
						type: FilterBaseType.DATE,
						name: FilterBaseName.DATE,
						filtration: 'is',
						value: new Date('01-01-2022')
					}
				]
			})
		)

		expect(actual).toEqual({
			home: [
				{
					id: 0,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					filtration: 'is',
					value: new Date('01-01-2022')
				}
			],
			new: [],
			stories: [],
			comments: [],
			polls: [],
			show: [],
			ask: []
		})
	})
})
