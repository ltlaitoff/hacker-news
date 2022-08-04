import {
	FilterBaseName,
	FilterBaseType,
	FilterReceived
} from 'typescript/filters'
import { getBySearchURL as apiGetBySearchURL } from '.'

const APIParameters = {
	QUERY: 'query_mock',
	TAGS: 'tags_mock',
	NUMBERIC_FILTERS: 'numericFilters_mock',
	PAGE: 'page_mock'
}

const NumericFilters = {
	DATE: 'date_mock',
	POINTS: 'points_mock',
	COMMENTS: 'comments_mock'
}

const SEARCH_URL_TEMPLATE = 'SEARCH_URL_TEMPLATE'

jest.mock('api/api.interfaces', () => {
	return {
		APIParameters,
		NumericFilters
	}
})

jest.mock('../../constants', () => ({
	SEARCH_URL_TEMPLATE: SEARCH_URL_TEMPLATE
}))

let mockGetPageParam = jest.fn(value => value)
let mockGetQueryParam = jest.fn(value => value)
let mockGetSearchType = jest.fn(value => value)
let mockGetTagsAndNumericFiltersParam = jest.fn(value => ({
	[APIParameters.NUMBERIC_FILTERS]: 'numberic_filters_return',
	[APIParameters.TAGS]: 'tags_return'
}))
let mockGetUrlParams = jest.fn(value => 'params_string')

jest.mock('../../helpers', () => ({
	getPageParam: (value: any) => mockGetPageParam(value),
	getQueryParam: (value: any) => mockGetQueryParam(value),
	getSearchType: (value: any) => mockGetSearchType(value),
	getTagsAndNumericFiltersParam: (value: any) =>
		mockGetTagsAndNumericFiltersParam(value),
	getUrlParams: (value: any) => mockGetUrlParams(value)
}))

describe('test getBySearchURL', () => {
	it.each`
		sorting           | callValue
		${'test_sorting'} | ${'test_sorting'}
		${'123'}          | ${'123'}
		${undefined}      | ${'DEFAULT'}
	`(
		'getBySearchURL with sorting = $sorting should call getSearchType with value = $callValue',
		({ sorting, callValue }) => {
			apiGetBySearchURL({
				searchValue: '',
				filters: [],
				page: 0,
				sorting: sorting
			})

			expect(mockGetSearchType).toBeCalledWith(callValue)
		}
	)

	it.each([
		[
			[
				{
					id: 1,
					type: FilterBaseType.NUMBER,
					name: FilterBaseName.COMMENTS,
					filtration: 'is',
					value: 13
				}
			]
		],
		[
			[
				{
					id: 2,
					type: FilterBaseType.NUMBER,
					name: FilterBaseName.POINTS,
					filtration: 'is',
					value: 13
				}
			]
		],
		[
			[
				{
					id: 3,
					type: FilterBaseType.STRING,
					name: FilterBaseName.AUTHOR,
					filtration: 'is',
					value: 'gg'
				}
			]
		],
		[
			[
				{
					id: 4,
					type: FilterBaseType.LIST,
					name: FilterBaseName.TAGS,
					listValues: ['all', 'story', 'ask_hn'],
					filtration: 'is',
					value: 'story'
				}
			]
		]
	])(
		'getBySearchURL with filters = %j should call getTagsAndNumericFiltersParam with value = filters',
		filters => {
			apiGetBySearchURL({
				searchValue: '',
				filters: filters as FilterReceived[],
				page: 0
			})

			expect(mockGetTagsAndNumericFiltersParam).toBeCalledWith(filters)
		}
	)

	it.each`
		searchValue
		${'test_sorting'}
		${'123'}
		${'test'}
	`(
		'getBySearchURL with searchValue = $searchValue should call getQueryParam with value = $searchValue',
		({ searchValue }) => {
			apiGetBySearchURL({
				searchValue: searchValue,
				filters: [],
				page: 0
			})

			expect(mockGetQueryParam).toBeCalledWith(searchValue)
		}
	)

	it.each`
		page
		${0}
		${55}
		${100}
	`(
		'getBySearchURL with page = $page should call getPageParam with value = $page',
		({ page }) => {
			apiGetBySearchURL({
				searchValue: '',
				filters: [],
				page: page
			})

			expect(mockGetPageParam).toBeCalledWith(page)
		}
	)

	it('getBySearchURL with searchValue = "test", filters = [], page = 0 should call getUrlParams with params = {"numericFilters_mock": "numberic_filters_return", "page_mock": 0, "query_mock": "", "tags_mock": "tags_return"}', () => {
		apiGetBySearchURL({
			searchValue: '',
			filters: [],
			page: 0
		})

		expect(mockGetUrlParams).toBeCalledWith({
			numericFilters_mock: 'numberic_filters_return',
			page_mock: 0,
			query_mock: '',
			tags_mock: 'tags_return'
		})
	})

	it(`getBySearchURL with searchValue = "test", filters = [], page = 0 should return "${SEARCH_URL_TEMPLATE}DEFAULTparams_string"`, () => {
		const result = apiGetBySearchURL({
			searchValue: '',
			filters: [],
			page: 0
		})

		expect(result).toBe(`${SEARCH_URL_TEMPLATE}DEFAULTparams_string`)
	})
})
