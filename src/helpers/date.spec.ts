import {
	isValidDate,
	isNotValidDate,
	getDateDay,
	getDateMonth,
	getDatePeopleMonth,
	getDateFullYear
} from './date'

describe('date helpers', () => {
	describe('is', () => {
		it.each`
			value        | result
			${1}         | ${false}
			${'test'}    | ${false}
			${true}      | ${false}
			${{}}        | ${false}
			${null}      | ${false}
			${undefined} | ${false}
		`(
			'isValidDate on not valid inputValue = $value should return $result',
			({ value, result }) => {
				const functionResult = isValidDate(value)

				expect(functionResult).toBe(result)
			}
		)

		it.each`
			value           | result
			${'1 Feb 2022'} | ${true}
			${'1 Jan 2020'} | ${true}
		`(
			'isValidDate on inputValue = $value should return $result',
			({ value, result }) => {
				const inputValue = new Date(value)

				expect(isValidDate(inputValue)).toBe(result)
				expect(isNotValidDate(inputValue)).not.toBe(result)
			}
		)
	})

	describe('get', () => {
		it.each`
			dateValue       | day     | month   | peopleMonth | year
			${'02-15-2022'} | ${15}   | ${1}    | ${2}        | ${2022}
			${'07-31-2022'} | ${31}   | ${6}    | ${7}        | ${2022}
			${'not valid'}  | ${null} | ${null} | ${null}     | ${null}
		`(
			'getDate function with date = "$dateValue" should return day = $day, month = $month, peopleMont = $peopleMonth, year = $year',
			({ dateValue, day, month, peopleMonth, year }) => {
				const date = new Date(dateValue)

				expect(getDateDay(date)).toBe(day)
				expect(getDateMonth(date)).toBe(month)
				expect(getDatePeopleMonth(date)).toBe(peopleMonth)
				expect(getDateFullYear(date)).toBe(year)
			}
		)
	})
})
