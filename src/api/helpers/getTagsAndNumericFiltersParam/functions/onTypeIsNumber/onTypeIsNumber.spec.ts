import { FilterBaseName, FilterBaseType } from 'typescript/filters'
import { onTypeIsNumber } from '.'

const COMMENTS_MOCK = 'comments_mock'

jest.mock('api/api.interfaces', () => ({
	NumericFilters: {
		COMMENTS: COMMENTS_MOCK
	}
}))

describe('api/helpers/getTagsAndNumericFiltersParam/functions/onTypeIsNumber', () => {
	describe.each`
		value
		${10}
		${25}
		${1000}
		${123}
	`('Value = $value, filtration on one element', ({ value }) => {
		it(`onTypeIsNumber with value = ${value}, filtration = "is" should return "${COMMENTS_MOCK}=${value}" `, () => {
			const result = onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				filtration: 'is',
				value: value
			})

			expect(result).toEqual(`${COMMENTS_MOCK}=${value}`)
		})

		it(`onTypeIsNumber with value = ${value}, filtration = "is bigger" should return "${COMMENTS_MOCK}>${value}" `, () => {
			const result = onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				filtration: 'is bigger',
				value: value
			})

			expect(result).toEqual(`${COMMENTS_MOCK}>${value}`)
		})

		it(`onTypeIsNumber with value = ${value}, filtration = "is lower" should return "${COMMENTS_MOCK}<${value}" `, () => {
			const result = onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				filtration: 'is lower',
				value: value
			})

			expect(result).toEqual(`${COMMENTS_MOCK}<${value}`)
		})

		it(`onTypeIsNumber with value = ${value}, filtration = "is on or bigger" should return "${COMMENTS_MOCK}>=${value}" `, () => {
			const result = onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				filtration: 'is on or bigger',
				value: value
			})

			expect(result).toEqual(`${COMMENTS_MOCK}>=${value}`)
		})

		it(`onTypeIsNumber with value = ${value}, filtration = "is on or lower" should return "${COMMENTS_MOCK}<=${value}" `, () => {
			const result = onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				filtration: 'is on or lower',
				value: value
			})

			expect(result).toEqual(`${COMMENTS_MOCK}<=${value}`)
		})
	})

	describe.each`
		firstValue | secondValue
		${10}      | ${25}
		${14}      | ${50}
		${17}      | ${74}
	`(
		'Value = [$firstValue, $secondValue], filtration on two elements',
		({ firstValue, secondValue }) => {
			it(`onTypeIsNumber with value = [${firstValue}, ${secondValue}] and filtration = 'is between' should return "${COMMENTS_MOCK}>${firstValue},${COMMENTS_MOCK}<${secondValue}"`, () => {
				const result = onTypeIsNumber({
					id: 0,
					name: FilterBaseName.COMMENTS,
					type: FilterBaseType.NUMBER,
					filtration: 'is between',
					value: [firstValue, secondValue]
				})

				expect(result).toEqual(
					`${COMMENTS_MOCK}>${firstValue},${COMMENTS_MOCK}<${secondValue}`
				)
			})
		}
	)

	it.each`
		value
		${-1}
		${0}
		${-10}
	`(
		'onTypeIsNumber with value = $value, filtration on one element should return ""',
		({ value }) => {
			const result = onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				filtration: 'is',
				value: value
			})

			expect(result).toEqual('')
		}
	)

	it.each`
		firstValue | secondValue
		${-1}      | ${100}
		${-10}     | ${0}
		${0}       | ${1000}
		${5}       | ${-1}
	`(
		'onTypeIsNumber with value = [$firstValue, $secondValue], filtration on two elements should return ""',
		({ firstValue, secondValue }) => {
			const result = onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				filtration: 'is between',
				value: [firstValue, secondValue]
			})

			expect(result).toEqual('')
		}
	)

	it('onTypeIsNumber with filtration = "wrong" should throw error with "Invalid filter.filtration = wrong in onTypeIsNumber"', () => {
		expect(() =>
			onTypeIsNumber({
				id: 0,
				name: FilterBaseName.COMMENTS,
				type: FilterBaseType.NUMBER,
				// @ts-expect-error
				filtration: 'wrong',
				value: 1
			})
		).toThrow('Invalid filter.filtration = wrong in onTypeIsNumber')
	})
})
