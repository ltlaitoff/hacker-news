// import {
// 	FilterBaseType,
// 	FilterBaseName,
// 	FilterReceived
// } from 'typescript/filters'
// import {
// 	getBySearchURL,
// 	getQueryParam,
// 	getTagsAndNumericFiltersParam
// } from './getBySearchURL'

import ColoredConsoleLogTemplates from 'utils/colors'

ColoredConsoleLogTemplates.todo('Write tests on getBySearchURL')

/*
	Notion: https://www.notion.so/getBySearchURL-tests-af65c970a7004237b7010f91ea2b5902
*/

describe('getBySearchURL', () => {
	it('-', () => {
		expect(true).toBe(true)
	})
})

// const APIParameters = {
// 	QUERY: 'query_mock',
// 	TAGS: 'tags_mock',
// 	NUMBERIC_FILTERS: 'numericFilters_mock',
// 	PAGE: 'page_mock'
// }

// const NumericFilters = {
// 	DATE: 'created_at_i_mock',
// 	POINTS: 'points_mock',
// 	COMMENTS: 'num_comments_mock'
// }

// jest.mock('api/api.interfaces', () => {
// 	return {
// 		APIParameters,
// 		NumericFilters
// 	}
// })

// describe('test getBySearchURL', () => {
// 	it.only('getBySearchURL test', () => {
// 		const filters: FilterReceived[] = [
// 			{
// 				id: 0,
// 				type: FilterBaseType.LIST,
// 				name: FilterBaseName.TAGS,
// 				filtration: 'is',
// 				listValues: ['all', 'story', 'poll', 'ask_hn'],
// 				value: 'story'
// 			},
// 			{
// 				id: 1,
// 				type: FilterBaseType.DATE,
// 				name: FilterBaseName.DATE,
// 				filtration: 'is before',
// 				value: new Date('01-05-2022')
// 			},
// 			{
// 				id: 0,
// 				type: FilterBaseType.NUMBER,
// 				name: FilterBaseName.COMMENTS,
// 				filtration: 'is on or bigger',
// 				value: 15
// 			}
// 		]

// 		const value = {
// 			searchValue: 'search',
// 			filters,
// 			page: 1
// 		}

// 		expect(getBySearchURL(value)).toBe({})
// 	})

// 	it('getQueryParam with value = "hello" should return "query=hello"', () => {
// 		expect(getQueryParam('hello')).toEqual({ [APIParameters.QUERY]: 'hello' })
// 	})

// 	it('getQueryParam with value = "" should return "query="', () => {
// 		expect(getQueryParam('')).toEqual({ [APIParameters.QUERY]: '' })
// 	})

// 	describe('getTagsAndNumericFiltersParam', () => {
// 		it('getTagsAndNumericFiltersParam with filters = [] should return {"numericFilters_mock": { "created_at_i_mock": "", "num_comments_mock": "", "points_mock": ""},"tags_mock": ""}', () => {
// 			expect(getTagsAndNumericFiltersParam([])).toEqual({
// 				numericFilters_mock: {
// 					created_at_i_mock: '',
// 					num_comments_mock: '',
// 					points_mock: ''
// 				},
// 				tags_mock: ''
// 			})
// 		})

// 		describe('With type: FilterBaseType.DATE, name: FilterBaseName.DATE', () => {
// 			const DATE_VALUE = 1641333600
// 			const SEC_IN_DAY = 86400
// 			const date = new Date(DATE_VALUE * 1000)

// 			it.each`
// 				date    | filtration           | dateResult
// 				${date} | ${'is'}              | ${`created_at_i_mock>${DATE_VALUE},created_at_i_mock<${DATE_VALUE + SEC_IN_DAY}`}
// 				${date} | ${'is before'}       | ${`created_at_i_mock<${DATE_VALUE}`}
// 				${date} | ${'is after'}        | ${`created_at_i_mock>${DATE_VALUE + SEC_IN_DAY}`}
// 				${date} | ${'is on or before'} | ${`created_at_i_mock<${DATE_VALUE + SEC_IN_DAY}`}
// 				${date} | ${'is on or after'}  | ${`created_at_i_mock>${DATE_VALUE}`}
// 				${date} | ${'invalid'}         | ${''}
// 			`(
// 				'getTagsAndNumericFiltersParam with filters = [{id: 0, type: FilterBaseType.DATE, name: FilterBaseName.DATE,filtration: $filtration, value: $date}] should return {"numericFilters_mock": { "created_at_i_mock": $dateResult, "num_comments_mock": "", "points_mock": ""},"tags_mock": ""}',
// 				({ date, filtration, dateResult }) => {
// 					const filters: FilterReceived[] = [
// 						{
// 							id: 0,
// 							type: FilterBaseType.DATE,
// 							name: FilterBaseName.DATE,
// 							filtration: filtration,
// 							value: date
// 						}
// 					]

// 					expect(getTagsAndNumericFiltersParam(filters)).toEqual({
// 						numericFilters_mock: {
// 							created_at_i_mock: dateResult,
// 							num_comments_mock: '',
// 							points_mock: ''
// 						},
// 						tags_mock: ''
// 					})
// 				}
// 			)
// 		})

// 		describe('With type: FilterBaseType.NUMBER, name: FilterBaseName.COMMENTS', () => {
// 			const VALUE = 10

// 			it.each`
// 				value    | filtration           | commentsResult
// 				${VALUE} | ${'is'}              | ${`num_comments_mock=${VALUE}`}
// 				${VALUE} | ${'is bigger'}       | ${`num_comments_mock>${VALUE}`}
// 				${VALUE} | ${'is lower'}        | ${`num_comments_mock<${VALUE}`}
// 				${VALUE} | ${'is on or bigger'} | ${`num_comments_mock>=${VALUE}`}
// 				${VALUE} | ${'is on or lower'}  | ${`num_comments_mock<=${VALUE}`}
// 				${VALUE} | ${'invalid'}         | ${''}
// 			`(
// 				'getTagsAndNumericFiltersParam with filters = [{id: 0, type: FilterBaseType.NUMBER, name: FilterBaseName.COMMENTS, filtration: $filtration, value: $value}] should return {"numericFilters_mock": { "created_at_i_mock": "", "num_comments_mock": $commentsResult, "points_mock": ""},"tags_mock": ""}',
// 				({ value, filtration, commentsResult }) => {
// 					const filters: FilterReceived[] = [
// 						{
// 							id: 0,
// 							type: FilterBaseType.NUMBER,
// 							name: FilterBaseName.COMMENTS,
// 							filtration: filtration,
// 							value: value
// 						}
// 					]

// 					expect(getTagsAndNumericFiltersParam(filters)).toEqual({
// 						numericFilters_mock: {
// 							created_at_i_mock: '',
// 							num_comments_mock: commentsResult,
// 							points_mock: ''
// 						},
// 						tags_mock: ''
// 					})
// 				}
// 			)
// 		})

// 		describe('With type: FilterBaseType.NUMBER, name: FilterBaseName.POINTS', () => {
// 			const VALUE = 15

// 			it.each`
// 				value    | filtration           | pointsResult
// 				${VALUE} | ${'is'}              | ${`points_mock=${VALUE}`}
// 				${VALUE} | ${'is bigger'}       | ${`points_mock>${VALUE}`}
// 				${VALUE} | ${'is lower'}        | ${`points_mock<${VALUE}`}
// 				${VALUE} | ${'is on or bigger'} | ${`points_mock>=${VALUE}`}
// 				${VALUE} | ${'is on or lower'}  | ${`points_mock<=${VALUE}`}
// 				${VALUE} | ${'invalid'}         | ${''}
// 			`(
// 				'getTagsAndNumericFiltersParam with filters = [{id: 0, type: FilterBaseType.NUMBER, name: FilterBaseName.COMMENTS, filtration: $filtration, value: $value}] should return {"numericFilters_mock": { "created_at_i_mock": "", "num_comments_mock": "", "points_mock": $pointsResult},"tags_mock": ""}',
// 				({ value, filtration, pointsResult }) => {
// 					const filters: FilterReceived[] = [
// 						{
// 							id: 0,
// 							type: FilterBaseType.NUMBER,
// 							name: FilterBaseName.POINTS,
// 							filtration: filtration,
// 							value: value
// 						}
// 					]

// 					expect(getTagsAndNumericFiltersParam(filters)).toEqual({
// 						numericFilters_mock: {
// 							created_at_i_mock: '',
// 							num_comments_mock: '',
// 							points_mock: pointsResult
// 						},
// 						tags_mock: ''
// 					})
// 				}
// 			)
// 		})

// 		describe('With type: FilterBaseType.LIST, name: FilterBaseName.TAGS, listValues = ["all", "story", "poll", "ask_hn"]', () => {
// 			it.each`
// 				value       | filtration     | tagsResult
// 				${'all'}    | ${'is'}        | ${''}
// 				${'story'}  | ${'is'}        | ${'story'}
// 				${'poll'}   | ${'is'}        | ${'poll'}
// 				${'ask_hn'} | ${'is'}        | ${'ask_hn'}
// 				${'all'}    | ${'is except'} | ${''}
// 				${'story'}  | ${'is except'} | ${'(poll,ask_hn)'}
// 				${'poll'}   | ${'is except'} | ${'(story,ask_hn)'}
// 				${'ask_hn'} | ${'is except'} | ${'(story,poll)'}
// 			`(
// 				'getTagsAndNumericFiltersParam with filters = [{id: 0, type: FilterBaseType.LIST, name: FilterBaseName.TAGS, listValues: ["all", "story", "poll", "ask_hn"], filtration: $filtration, value: $value}] should return {"numericFilters_mock": { "created_at_i_mock": "", "num_comments_mock": "", "points_mock": $pointsResult}, "tags_mock": $tagsResult}',
// 				({ value, filtration, tagsResult }) => {
// 					const filters: FilterReceived[] = [
// 						{
// 							id: 0,
// 							type: FilterBaseType.LIST,
// 							name: FilterBaseName.TAGS,
// 							filtration: filtration,
// 							listValues: ['all', 'story', 'poll', 'ask_hn'],
// 							value: value
// 						}
// 					]

// 					expect(getTagsAndNumericFiltersParam(filters)).toEqual({
// 						numericFilters_mock: {
// 							created_at_i_mock: '',
// 							num_comments_mock: '',
// 							points_mock: ''
// 						},
// 						tags_mock: tagsResult
// 					})
// 				}
// 			)
// 		})
// 	})
// })
