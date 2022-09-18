import { getDefaultDateValue } from './getDefaultDateValue'

const DATE_NOW = new Date('01-01-2021')
jest.useFakeTimers().setSystemTime(DATE_NOW)

describe('DatePicker/getDefaultDateValue', () => {
	it.each`
		value                                               | result
		${null}                                             | ${[DATE_NOW, DATE_NOW]}
		${[null, new Date('01-01-2022')]}                   | ${[DATE_NOW, DATE_NOW]}
		${[new Date('01-01-2022'), null]}                   | ${[DATE_NOW, DATE_NOW]}
		${[new Date('01-01-2022'), new Date('01-01-2022')]} | ${[new Date('01-01-2022'), new Date('01-01-2022')]}
		${new Date('01-01-2022')}                           | ${[new Date('01-01-2022'), new Date('01-01-2022')]}
	`(
		'getDefaultDateValue with value = $value should return $result',
		({ value, result }) => {
			expect(getDefaultDateValue(value)).toEqual(result)
		}
	)
})
