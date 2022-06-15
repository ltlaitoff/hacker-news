import { trasformDateIntoFormat, getZeroPadded } from './trasformDateIntoFormat'

describe('trasformDateIntoFormat', () => {
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
		'trasformDateIntoFormat with date = $date and format = $format should return $result',
		({ date, format, result }) => {
			const functionResult = trasformDateIntoFormat(new Date(date), format)

			expect(functionResult).toEqual(result)
		}
	)

	it.each`
		value    | result
		${1}     | ${'01'}
		${'1'}   | ${'01'}
		${' 1 '} | ${' 1 '}
	`(
		'getZeroPadded with value = $value should return a result = $result',
		({ value, result }) => {
			expect(getZeroPadded(value)).toEqual(result)
		}
	)
})
