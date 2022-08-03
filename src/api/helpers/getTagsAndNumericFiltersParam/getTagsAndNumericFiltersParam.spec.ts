import {
	FilterBaseName,
	FilterBaseType,
	FilterDateReceived,
	FilterNumberReceived,
	FilterReceived
} from 'typescript/filters'
import { FilterStringReceived } from 'typescript/filters'
import { FilterListReceived } from 'typescript'
import { getTagsAndNumericFiltersParam } from './getTagsAndNumericFiltersParam'

jest.mock('../../api.interfaces', () => ({
	APIParameters: {
		QUERY: 'query',
		TAGS: 'tags',
		NUMBERIC_FILTERS: 'numericFilters',
		PAGE: 'page',
		AUTHOR: 'author'
	},
	NumericFilters: {
		DATE: 'date',
		POINTS: 'points',
		COMMENTS: 'comments'
	}
}))

const mockOnTypeIsNumber = jest.fn(value => `is_number-${value.value}`)
const mockOnTypeIsList = jest.fn(value => `is_list-${value.value}`)
const mockOnTypeIsDate = jest.fn(value => `is_date-${value.filtration}`)
const mockOnTypeIsString = jest.fn(value => `is_string-${value.value}`)

jest.mock('./functions', () => {
	return {
		onTypeIsNumber: (value: any) => mockOnTypeIsNumber(value),
		onTypeIsList: (value: any) => mockOnTypeIsList(value),
		onTypeIsDate: (value: any) => mockOnTypeIsDate(value),
		onTypeIsString: (value: any) => mockOnTypeIsString(value)
	}
})

const DATE_FILTER: FilterDateReceived = {
	id: 0,
	type: FilterBaseType.DATE,
	name: FilterBaseName.DATE,
	filtration: 'is',
	value: new Date('01-01-2022')
}

const COMMENTS_FILTER: FilterNumberReceived = {
	id: 1,
	type: FilterBaseType.NUMBER,
	name: FilterBaseName.COMMENTS,
	filtration: 'is',
	value: 13
}

const POINTS_FILTER: FilterNumberReceived = {
	id: 2,
	type: FilterBaseType.NUMBER,
	name: FilterBaseName.POINTS,
	filtration: 'is',
	value: 13
}

const AUTHOR_FILTER: FilterStringReceived = {
	id: 3,
	type: FilterBaseType.STRING,
	name: FilterBaseName.AUTHOR,
	filtration: 'is',
	value: 'gg'
}

const TAGS_FILTER: FilterListReceived = {
	id: 4,
	type: FilterBaseType.LIST,
	name: FilterBaseName.TAGS,
	listValues: ['all', 'story', 'ask_hn'],
	filtration: 'is',
	value: 'story'
}

const filters: FilterReceived[] = [
	DATE_FILTER,
	COMMENTS_FILTER,
	POINTS_FILTER,
	AUTHOR_FILTER,
	TAGS_FILTER
]

const result = {
	numericFilters: 'is_number-13,is_number-13,is_date-is',
	tags: 'is_string-gg,is_list-story'
}

/*
	getTagsAndNumericFiltersParam with filters = $filters
		
		Should call onTypeIsNumber twice with $value
		Should call onTypeIsDate with $value
		Should call onTypeIsString with $value
		Should return $result
*/
describe('getTagsAndNumericFiltersParam', () => {
	describe(`getTagsAndNumericFiltersParam with filters = ${JSON.stringify(
		filters
	)}`, () => {
		it(`Should call onTypeIsList with ${JSON.stringify(TAGS_FILTER)}`, () => {
			getTagsAndNumericFiltersParam(filters)

			expect(mockOnTypeIsList).toBeCalledWith(TAGS_FILTER)
		})

		it(`Should call onTypeIsNumber twice with ${JSON.stringify(
			COMMENTS_FILTER
		)} and ${JSON.stringify(POINTS_FILTER)}`, () => {
			getTagsAndNumericFiltersParam(filters)

			expect(mockOnTypeIsNumber).toBeCalledWith(COMMENTS_FILTER)
			expect(mockOnTypeIsNumber).toBeCalledWith(POINTS_FILTER)
		})

		it(`Should call onTypeIsDate with ${JSON.stringify(DATE_FILTER)}`, () => {
			getTagsAndNumericFiltersParam(filters)

			expect(mockOnTypeIsDate).toBeCalledWith(DATE_FILTER)
		})

		it(`Should call onTypeIsString with ${JSON.stringify(
			AUTHOR_FILTER
		)}`, () => {
			getTagsAndNumericFiltersParam(filters)

			expect(mockOnTypeIsString).toBeCalledWith(AUTHOR_FILTER)
		})

		it(`should return ${JSON.stringify(result)}`, () => {
			const functionResult = getTagsAndNumericFiltersParam(filters)

			expect(functionResult).toEqual(result)
		})
	})

	it('getTagsAndNumericFiltersParam with invalid filter = {"name": "wrong"} should throw error', () => {
		expect(() =>
			getTagsAndNumericFiltersParam([
				{
					id: 0,
					type: FilterBaseType.DATE,
					// @ts-expect-error
					name: 'wrong',
					filtration: 'is',
					value: new Date('01-01-2022')
				}
			])
		).toThrowError('Invalid filter name')
	})
})
