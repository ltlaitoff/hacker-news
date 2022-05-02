import { getInputValue, getZeroPadded } from './getInputValue'

describe('getInputValue', () => {
	it.each`
		date            | format         | result
		${'1 Jan 2022'} | ${'dd/M/Y'}    | ${'01/1/2022'}
		${'1 Jan 2022'} | ${'dd/MM/Y'}   | ${'01/01/2022'}
		${'1 Feb 2022'} | ${'d/M/Y'}     | ${'1/2/2022'}
		${'1 Feb 2022'} | ${'d/MM/Y'}    | ${'1/02/2022'}
		${'02/01/2022'} | ${'d/M/Y'}     | ${'1/2/2022'}
		${'02/01/2022'} | ${'TEST'}      | ${'TEST'}
		${'2/1/22'}     | ${'Its d/M/Y'} | ${'Its 1/2/2022'}
		${'2/1/22'}     | ${''}          | ${''}
		${'foo'}        | ${''}          | ${null}
	`(
		'getInputValue with date = $date and format = $format should return $result',
		({ date, format, result }) => {
			const functionResult = getInputValue(new Date(date), format)

			expect(functionResult).toEqual(result)
		}
	)

	it.each`
		value    | result
		${1}     | ${'01'}
		${'1'}   | ${'01'}
		${' 1 '} | ${' 1 '}
	`(
		'On input value = ${value} getZeroPadded should return a result = $result',
		({ value, result }) => {
			const functionResult = getZeroPadded(value)

			expect(functionResult).toEqual(result)
		}
	)
})
