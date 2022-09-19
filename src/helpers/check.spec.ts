import { checkOnMinMax, checkOnMinMaxIncludes } from './check'

describe('check', () => {
	it.each`
		value | min  | max   | result
		${8}  | ${2} | ${10} | ${true}
		${7}  | ${2} | ${10} | ${true}
		${2}  | ${2} | ${10} | ${false}
		${10} | ${2} | ${10} | ${false}
		${11} | ${2} | ${10} | ${false}
		${1}  | ${2} | ${10} | ${false}
	`(
		'checkOnMinMax with array = $arr, element = $element should return $result',
		({ value, min, max, result }) => {
			expect(checkOnMinMax(value, { min: min, max: max })).toBe(result)
		}
	)

	it.each`
		value | min  | max   | result
		${7}  | ${2} | ${10} | ${true}
		${8}  | ${2} | ${10} | ${true}
		${2}  | ${2} | ${10} | ${true}
		${10} | ${2} | ${10} | ${true}
		${11} | ${2} | ${10} | ${false}
		${1}  | ${2} | ${10} | ${false}
	`(
		'checkOnMinMaxIncludes with array = $arr, element = $element should return $result',
		({ value, min, max, result }) => {
			expect(checkOnMinMaxIncludes(value, { min: min, max: max })).toBe(result)
		}
	)
})
