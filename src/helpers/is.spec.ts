import { isEqual, isNoStrictEqual } from './is'
import { isNotEqual, isNotNoStrictEqual } from './isNot'

describe('is helper', () => {
	describe('equals', () => {
		it.each`
			first        | second    | result
			${1}         | ${1}      | ${true}
			${'1'}       | ${1}      | ${false}
			${true}      | ${1}      | ${false}
			${true}      | ${true}   | ${true}
			${'test'}    | ${'test'} | ${true}
			${[]}        | ${[]}     | ${false}
			${undefined} | ${null}   | ${false}
		`(
			'isEqual with args ($first, $second) should return $result',
			({ first, second, result }) => {
				expect(isEqual(first, second)).toBe(result)
				expect(isNotEqual(first, second)).not.toBe(result)
			}
		)

		it.each`
			first        | second    | result
			${1}         | ${1}      | ${true}
			${'1'}       | ${1}      | ${true}
			${true}      | ${1}      | ${true}
			${true}      | ${true}   | ${true}
			${'test'}    | ${'test'} | ${true}
			${[]}        | ${[]}     | ${false}
			${undefined} | ${null}   | ${true}
		`(
			'isNoStrictEqual with args ($first, $second) should return $result',
			({ first, second, result }) => {
				expect(isNoStrictEqual(first, second)).toBe(result)
				expect(isNotNoStrictEqual(first, second)).not.toBe(result)
			}
		)
	})
})
