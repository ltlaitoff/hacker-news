import { isEqual, isNoStrictEqual, isTrue, isFalse } from './is'
import { isNotEqual, isNotNoStrictEqual, isNotTrue, isNotFalse } from './isNot'

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

	describe('is types', () => {
		it.each`
			arg          | result
			${null}      | ${false}
			${undefined} | ${false}
			${true}      | ${true}
			${''}        | ${false}
			${'test'}    | ${true}
		`(
			'isTrue and isNotFalse with arg = $arg should return $result',
			({ arg, result }) => {
				console.log(arg, arg === true, result)
				expect(isTrue(arg)).toBe(result)
				expect(isNotFalse(arg)).toBe(result)
			}
		)

		it.each`
			arg          | result
			${null}      | ${true}
			${undefined} | ${true}
			${true}      | ${false}
			${''}        | ${true}
			${'test'}    | ${false}
		`(
			'isFalse and isNotTrue with arg = $arg should return $result',
			({ arg, result }) => {
				console.log(arg, arg === true, result)
				expect(isFalse(arg)).toBe(result)
				expect(isNotTrue(arg)).toBe(result)
			}
		)
	})
})
