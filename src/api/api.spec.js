import axios from 'axios'
import { getItemInfo, getUserInfo, getBySearch } from './api'

import { ColoredConsoleLog } from 'utils'
jest.mock('axios')

ColoredConsoleLog.fixme('Write tests for API')

describe('api', () => {
	it('plug', () => {
		expect(true).toBe(true)
	})

	// beforeEach(() => {
	// 	axios.get.mockImplementationOnce(data => Promise.resolve(data))
	// })
	// it('getItemInfo called with -1 should be throw error', () => {
	// 	expect(() => getItemInfo(-1)).toThrow(
	// 		'api error: id must be greated or equals 0'
	// 	)
	// })
	// it('getItemInfo called with 1 should be return link with items/1', () => {
	// 	getItemInfo(1)
	// 	expect(axios.get).toBeCalledWith('http://hn.algolia.com/api/v1/items/1')
	// })
	// it('getItemInfo called with `test` should be return link with `users/test`', () => {
	// 	getUserInfo('test')
	// 	expect(axios.get).toBeCalledWith('http://hn.algolia.com/api/v1/users/test')
	// })
	// it('getBySearch called with query = `1` should be return link with search?query=1', () => {
	// 	getBySearch({
	// 		query: '1'
	// 	})
	// 	expect(axios.get).toBeCalledWith(
	// 		'http://hn.algolia.com/api/v1/search?query=1'
	// 	)
	// })
	// it('getBySearch called with tags = [] should be return link with search?', () => {
	// 	getBySearch({
	// 		tags: []
	// 	})
	// 	expect(axios.get).toBeCalledWith('http://hn.algolia.com/api/v1/search?')
	// })
	// it('getBySearch called with searchByDate = true should be return link with search_by_date?', () => {
	// 	getBySearch({
	// 		searchByDate: true
	// 	})
	// 	expect(axios.get).toBeCalledWith(
	// 		'http://hn.algolia.com/api/v1/search_by_date?'
	// 	)
	// })
	// it('getBySearch called with numericFilters should be return link with correct link', () => {
	// 	const numericFilters = {
	// 		created_at_i: {
	// 			less: 100,
	// 			greated: 10
	// 		},
	// 		points: {
	// 			lessOrEqual: 50,
	// 			greaterOrEqual: 30
	// 		},
	// 		num_comments: {
	// 			equal: 40
	// 		}
	// 	}
	// 	getBySearch({
	// 		numericFilters: numericFilters
	// 	})
	// 	expect(axios.get).toBeCalledWith(
	// 		'http://hn.algolia.com/api/v1/search_by_date?numericFilters=created_at_i<100,created_at_i>10,points<=50,points>=30,num_comments=40'
	// 	)
	// })
	// it('getBySearch called with page = 1 should be return link with search?page=1', () => {
	// 	getBySearch({
	// 		page: 1
	// 	})
	// 	expect(axios.get).toBeCalledWith(
	// 		'http://hn.algolia.com/api/v1/search?page=1'
	// 	)
	// })
})
