import { FilterBaseName, FilterBaseType } from 'typescript/filters'
import { onTypeIsDate } from './onTypeIsDate'

const SECONDS_IN_DAY = 10
const DATE_MOCK = 'dateMock'
let mockGetDateSeconds: jest.Mock

jest.mock('api/api.interfaces', () => ({
	NumericFilters: {
		DATE: DATE_MOCK
	}
}))

jest.mock('data/constants', () => ({
	SECONDS_IN_DAY: SECONDS_IN_DAY
}))

jest.mock('helpers', () => {
	mockGetDateSeconds = jest.fn((date: Date): number => {
		return Math.round(date.getTime() / 1000)
	})

	return {
		getDateSeconds: mockGetDateSeconds
	}
})

describe('api/helpers/getTagsAndNumericFiltersParam/functions/onTypeIsDate', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	describe.each`
		dateNumber | date
		${10007}   | ${new Date(10007 * 1000)}
		${999956}  | ${new Date(999956 * 1000)}
		${2503}    | ${new Date(2503 * 1000)}
		${99875}   | ${new Date(99875 * 1000)}
		${665123}  | ${new Date(665123 * 1000)}
	`(
		'With filter.value = $date and filtration on one element',
		({ dateNumber, date }) => {
			it(`getDateSeconds should be called with date = ${date}`, () => {
				onTypeIsDate({
					filtration: 'is',
					value: date,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					id: 0
				})

				expect(mockGetDateSeconds).toBeCalledWith(date)
			})

			it(`onTypeIsDate with filtration = "is" and value = ${date} should return "${DATE_MOCK}>${dateNumber},${DATE_MOCK}<${
				dateNumber + SECONDS_IN_DAY
			}"`, () => {
				const result = onTypeIsDate({
					id: 0,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					filtration: 'is',
					value: date
				})

				expect(result).toEqual(
					`${DATE_MOCK}>${dateNumber},${DATE_MOCK}<${
						dateNumber + SECONDS_IN_DAY
					}`
				)
			})

			it(`onTypeIsDate with filtration = "is before" and value = ${date} should return "${DATE_MOCK}<${dateNumber}"`, () => {
				const result = onTypeIsDate({
					id: 0,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					filtration: 'is before',
					value: date
				})

				expect(result).toEqual(`${DATE_MOCK}<${dateNumber}`)
			})

			it(`onTypeIsDate with filtration = "is after" and value = ${date} should return "${DATE_MOCK}>${
				dateNumber + SECONDS_IN_DAY
			}"`, () => {
				const result = onTypeIsDate({
					id: 0,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					filtration: 'is after',
					value: date
				})

				expect(result).toEqual(`${DATE_MOCK}>${dateNumber + SECONDS_IN_DAY}`)
			})

			it(`onTypeIsDate with filtration = "is on or before" and value = ${date} should return "${DATE_MOCK}<${
				dateNumber + SECONDS_IN_DAY
			}"`, () => {
				const result = onTypeIsDate({
					id: 0,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					filtration: 'is on or before',
					value: date
				})

				expect(result).toEqual(`${DATE_MOCK}<${dateNumber + SECONDS_IN_DAY}`)
			})

			it(`onTypeIsDate with filtration = "is on or after" and value = ${date} should return "${DATE_MOCK}>${dateNumber}"`, () => {
				const result = onTypeIsDate({
					id: 0,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					filtration: 'is on or after',
					value: date
				})

				expect(result).toEqual(`${DATE_MOCK}>${dateNumber}`)
			})
		}
	)

	describe.each`
		firstDateNumber | firstDate                  | secondDateNumber | secondDate
		${10007}        | ${new Date(10007 * 1000)}  | ${12007}         | ${new Date(12007 * 1000)}
		${999956}       | ${new Date(999956 * 1000)} | ${1009956}       | ${new Date(1009956 * 1000)}
		${2503}         | ${new Date(2503 * 1000)}   | ${25503}         | ${new Date(25503 * 1000)}
		${99875}        | ${new Date(99875 * 1000)}  | ${150875}        | ${new Date(150875 * 1000)}
		${665123}       | ${new Date(665123 * 1000)} | ${66785123}      | ${new Date(66785123 * 1000)}
	`(
		'With filter.value = [$firstDate, $secondDate] and filtration on two elements',
		({ firstDateNumber, firstDate, secondDateNumber, secondDate }) => {
			it('getDateSeconds should be called first time with date = $firstDate, second time with date = $secondDate', () => {
				onTypeIsDate({
					filtration: 'is within',
					value: [firstDate, secondDate],
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					id: 0
				})

				expect(mockGetDateSeconds).toBeCalledWith(firstDate)
				expect(mockGetDateSeconds).toBeCalledWith(secondDate)
			})

			it(`onTypeIsDate with filtration = "is within" and value = [$firstDate, $secondDate] should return "${DATE_MOCK}>${firstDateNumber},${DATE_MOCK}<${secondDateNumber}"`, () => {
				const result = onTypeIsDate({
					id: 0,
					type: FilterBaseType.DATE,
					name: FilterBaseName.DATE,
					filtration: 'is within',
					value: [firstDate, secondDate]
				})

				expect(result).toEqual(
					`${DATE_MOCK}>${firstDateNumber},${DATE_MOCK}<${secondDateNumber}`
				)
			})
		}
	)

	it('With filtration = "wrong", onTypeIsDate should throw error with "Invalid filter.filtration = wrond in onTypeIsDate"', () => {
		expect(() =>
			onTypeIsDate({
				id: 0,
				type: FilterBaseType.DATE,
				name: FilterBaseName.DATE,
				value: new Date(1),
				// @ts-expect-error
				filtration: 'wrong'
			})
		).toThrowError('Invalid filter.filtration = wrong in onTypeIsDate')
	})
})
