import { getSearchType } from './getSearchType'

jest.mock('../../constants', () => {
	return {
		SEARCH_TYPES: {
			test1: 'test1value',
			test2: 'test2value'
		}
	}
})

describe('api/helpers/getSearchType', () => {
	it.each`
		arg         | result
		${'test1'}  | ${'test1value'}
		${'test2'}  | ${'test2value'}
		${'random'} | ${undefined}
	`(
		'getSearchType with arg = $arg should return $result',
		({ arg, result }) => {
			expect(getSearchType(arg)).toBe(result)
		}
	)
})
