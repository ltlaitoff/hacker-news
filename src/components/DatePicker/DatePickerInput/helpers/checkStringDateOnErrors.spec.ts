import {
	checkDateOnErrors,
	createDateByDayMonthYear,
	checkStringDateOnErrors
} from './checkStringDateOnErrors'

describe('checkStringDateOnErrors', () => {
	it.each`
		date                      | arg                                  | result
		${new Date('01-01-2022')} | ${{ day: 1, month: 1, year: 2022 }}  | ${new Date('01-01-2022')}
		${new Date('02-28-2022')} | ${{ day: 28, month: 2, year: 2022 }} | ${new Date('02-28-2022')}
		${new Date('02-29-2022')} | ${{ day: 29, month: 2, year: 2022 }} | ${null}
		${new Date('01-40-2022')} | ${{ day: 40, month: 1, year: 2022 }} | ${null}
	`(
		'checkDateOnErrors with arg = $arg should return $result',
		({ date, arg, result }) => {
			expect(checkDateOnErrors(date, arg)).toStrictEqual(result)
		}
	)

	it.each`
		arg                                  | result
		${{ day: 1, month: 1, year: 2020 }}  | ${new Date('01-01-2020')}
		${{ day: 28, month: 2, year: 2022 }} | ${new Date('02-28-2022')}
		${{ day: 29, month: 2, year: 2022 }} | ${null}
		${{ day: 40, month: 1, year: 2020 }} | ${null}
	`(
		'createDateByDayMonthYear with arg = $arg should return $result',
		({ arg, result }) => {
			expect(createDateByDayMonthYear(arg)).toStrictEqual(result)
		}
	)

	it.each`
		stringDate             | format              | result
		${'02/01/2022'}        | ${'dd/MM/Y'}        | ${new Date('01-02-2022')}
		${'2/1/2022'}          | ${'d/M/Y'}          | ${new Date('01-02-2022')}
		${'TEST 2 W 1 T 2022'} | ${'TEST d W M T Y'} | ${new Date('01-02-2022')}
		${'T2/1/2022T'}        | ${'Td/M/YT'}        | ${new Date('01-02-2022')}
		${'T2/1/2022T'}        | ${'notvalid'}       | ${null}
		${'2g/1g/20g22'}       | ${'d/M/Y'}          | ${null}
		${'notvalid'}          | ${'notvalid'}       | ${null}
		${''}                  | ${''}               | ${null}
	`(
		'checkStringDateOnErrors with stringDate = $stringDate and format = $format should return $result',
		({ stringDate, format, result }) => {
			expect(checkStringDateOnErrors(stringDate, format)).toStrictEqual(result)
		}
	)
})
