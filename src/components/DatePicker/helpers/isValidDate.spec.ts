import { isValidDate } from './isValidDate'

describe('isValidDate', () => {
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

			const functionResult = isValidDate(inputValue)

			expect(functionResult).toBe(result)
		}
	)
})
