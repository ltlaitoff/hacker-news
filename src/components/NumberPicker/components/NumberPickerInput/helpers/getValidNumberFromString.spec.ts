import { getValidNumberFromString } from './getValidNumberFromString'

describe('NumberPicker/NumberPickerInput/getValidNumberFromString', () => {
	it.each`
		string        | min  | max
		${''}         | ${0} | ${0}
		${'1e3'}      | ${0} | ${0}
		${'1.3'}      | ${0} | ${0}
		${'abs'}      | ${0} | ${0}
		${'Infinity'} | ${0} | ${0}
	`(
		'getValidNumberFromString with string = $string should return null',
		({ string, min, max }) => {
			expect(getValidNumberFromString(string, { min, max })).toBe(null)
		}
	)

	it.each`
		string     | min  | max
		${'-1'}    | ${0} | ${100}
		${'-100'}  | ${0} | ${100}
		${'-999'}  | ${0} | ${100}
		${'-1050'} | ${0} | ${100}
		${'-1240'} | ${0} | ${100}
	`(
		'getValidNumberFromString with string = $string and min = $min > string should return null',
		({ string, min, max }) => {
			expect(getValidNumberFromString(string, { min, max })).toBe(null)
		}
	)

	it.each`
		string    | min  | max
		${'101'}  | ${0} | ${100}
		${'150'}  | ${0} | ${100}
		${'999'}  | ${0} | ${100}
		${'1050'} | ${0} | ${100}
		${'1240'} | ${0} | ${100}
	`(
		'getValidNumberFromString with string = $string and max = $max < string should return null',
		({ string, min, max }) => {
			expect(getValidNumberFromString(string, { min, max })).toBe(null)
		}
	)

	it.each`
		string   | min  | max    | result
		${'0'}   | ${0} | ${100} | ${0}
		${'100'} | ${0} | ${100} | ${100}
		${'50'}  | ${0} | ${100} | ${50}
		${'23'}  | ${0} | ${100} | ${23}
		${'12'}  | ${0} | ${100} | ${12}
	`(
		'getValidNumberFromString with string = $string and max = $max < string should return $result',
		({ string, min, max, result }) => {
			expect(getValidNumberFromString(string, { min, max })).toBe(result)
		}
	)
})
