import searchesReducer, { changeSearch, SearchesStoreType } from './index'

describe('Searches reducer', () => {
	const initialState: SearchesStoreType = {
		home: '',
		new: '',
		stories: '',
		comments: '',
		polls: '',
		show: '',
		ask: ''
	}

	it('searchesReducer should handle initial state', () => {
		expect(searchesReducer(undefined, { type: 'unknown' })).toEqual(
			initialState
		)
	})

	it('searchesReducer should handle changeSearch', () => {
		const actual = searchesReducer(
			initialState,
			changeSearch({
				home: 'test'
			})
		)

		expect(actual).toEqual({
			home: 'test',
			new: '',
			stories: '',
			comments: '',
			polls: '',
			show: '',
			ask: ''
		})
	})
})
