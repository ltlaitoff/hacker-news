import { getUrlParams } from './getUrlParams'

jest.mock('../../api.interfaces', () => {
	return {
		APIParameters: {
			QUERY: 'query_mock',
			PAGE: 'page_mock',
			TAGS: 'tags_mock',
			NUMBERIC_FILTERS: 'numberic_filters_mock'
		}
	}
})

describe('api/helpers/getUrlParams', () => {
	it.each`
		arg                                                                                                                | result
		${{ query_mock: 'test_query', page_mock: '4', tags: 'test_tags', numberic_filters_mock: 'numberic_filters_mock' }} | ${'?query_mock=test_query&page_mock=4&tags=test_tags&numberic_filters_mock=numberic_filters_mock'}
		${{ query_mock: 'random_query', page_mock: '5', tags: 'TAG' }}                                                     | ${'?query_mock=random_query&page_mock=5&tags=TAG'}
		${{ query_mock: '', page_mock: '5', tags: 'story', numberic_filters_mock: '' }}                                    | ${'?page_mock=5&tags=story'}
		${{}}                                                                                                              | ${''}
	`('getUrlParams with arg = $arg should return $result', ({ arg, result }) => {
		expect(getUrlParams(arg)).toBe(result)
	})
})
