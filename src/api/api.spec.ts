import ColoredConsoleLogTemplates from 'utils/colors'
import { getBySearch as getAPIBySearch, getItemInfo, getUserInfo } from './api'
import {
	FilterBaseName,
	FilterBaseType,
	FilterReceived
} from '../typescript/filters/filters'

ColoredConsoleLogTemplates.todo('Write tests on api(#85)')

/*
	Notion: https://www.notion.so/api-tests-d21fb069b4ac486a80c63b81c0864c7d
*/

// const mockGetFromAPI = jest.fn()

// jest.mock('./fetch', () => {
// 	return {
// 		getFromAPI: (args) => mockGetFromAPI(args)
// 	}
// })

describe('api', () => {
	it('-', () => {
		expect(true).toBe(true)
	})

	// it('getItemInfo', () => {
	// 	getItemInfo(1)

	// 	expect(mockGetFromAPI).toBeCalledWith('1')
	// })

	// it('getUserInfo', () => {
	// 	getUserInfo('test')

	// 	expect(mockGetFromAPI).toBeCalledWith('1')
	// })

	// it('getBySearch', () => {
	// 	const filters: FilterReceived[] = [
	// 		{
	// 			id: 0,
	// 			type: FilterBaseType.LIST,
	// 			name: FilterBaseName.TAGS,
	// 			listValues: ['all', 'ask_hn', 'poll', 'story'],
	// 			value: 'poll',
	// 			filtration: 'is except'
	// 		}
	// 	]

	// 	getAPIBySearch({
	// 		searchValue: 'seach',
	// 		filters,
	// 		page: 1,
	// 		sorting: 'DEFAULT'
	// 	})

	// 	expect(mockGetFromAPI).toBeCalledWith('1')
	// })
})
