import getDayMonthYearFromStringByFormat from './getDayMonthYearFromStringByFormat'

describe('getDayMonthYearFromStringByFormat', () => {
	it.each`
		stringDate             | format              | result
		${'02/01/2022'}        | ${'dd/MM/Y'}        | ${{ day: 2, month: 1, year: 2022 }}
		${'2/1/2022'}          | ${'d/M/Y'}          | ${{ day: 2, month: 1, year: 2022 }}
		${'TEST 2 W 1 T 2022'} | ${'TEST d W M T Y'} | ${{ day: 2, month: 1, year: 2022 }}
		${'T2/1/2022T'}        | ${'Td/M/YT'}        | ${{ day: 2, month: 1, year: 2022 }}
		${'T2/1/2022T'}        | ${'notvalid'}       | ${null}
		${'34/14/2022'}        | ${'dd/MM/Y'}        | ${null}
		${'34142022'}          | ${'ddMMY'}          | ${null}
		${'2g/1g/20g22'}       | ${'d/M/Y'}          | ${null}
		${'notvalid'}          | ${'notvalid'}       | ${null}
		${''}                  | ${'dd/MM/Y'}        | ${null}
		${'02/01/2022'}        | ${''}               | ${null}
		${''}                  | ${''}               | ${null}
	`(
		'getDayMonthYearFromStringByFormat with stringDate = "$stringDate" and format = "$format" should return $result',
		({ stringDate, format, result }) => {
			expect(getDayMonthYearFromStringByFormat(stringDate, format)).toEqual(
				result
			)
		}
	)
})
