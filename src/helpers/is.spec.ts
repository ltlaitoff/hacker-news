import {
	isEqual,
	isNoStrictEqual,
	isTrue,
	isFalse,
	isNumber,
	isValidNumber,
	isStrictTrue,
	isStrictFalse,
	isNull,
	isNoStrictNull
} from './is'

import {
	isNotEqual,
	isNotNoStrictEqual,
	isNotTrue,
	isNotFalse,
	isNotNumber,
	isNotValidNumber,
	isStrictNotTrue,
	isStrictNotFalse,
	isNotNull,
	isNotNoStrictNull
} from './isNot'

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
				expect(isFalse(arg)).toBe(result)
				expect(isNotTrue(arg)).toBe(result)
			}
		)

		it.each`
			arg          | result
			${null}      | ${false}
			${undefined} | ${false}
			${true}      | ${true}
			${''}        | ${false}
			${'test'}    | ${false}
		`(
			'isStrictTrue with arg = $arg should return $result',
			({ arg, result }) => {
				expect(isStrictTrue(arg)).toBe(result)
				expect(isStrictNotTrue(arg)).not.toBe(result)
			}
		)

		it.each`
			arg          | result
			${null}      | ${false}
			${undefined} | ${false}
			${true}      | ${false}
			${false}     | ${true}
			${''}        | ${false}
			${'test'}    | ${false}
		`(
			'isStrictFalse with arg = $arg should return $result',
			({ arg, result }) => {
				expect(isStrictFalse(arg)).toBe(result)
				expect(isStrictNotFalse(arg)).not.toBe(result)
			}
		)

		it.each`
			arg          | result
			${null}      | ${false}
			${undefined} | ${false}
			${true}      | ${false}
			${''}        | ${false}
			${'test'}    | ${false}
			${123}       | ${true}
			${NaN}       | ${true}
		`('isNumber with arg = $arg should return $result', ({ arg, result }) => {
			expect(isNumber(arg)).toBe(result)
			expect(isNotNumber(arg)).not.toBe(result)
		})

		it.each`
			arg          | result
			${null}      | ${false}
			${undefined} | ${false}
			${true}      | ${false}
			${''}        | ${false}
			${'test'}    | ${false}
			${123}       | ${true}
			${NaN}       | ${false}
		`(
			'isValidNumber with arg = $arg should return $result',
			({ arg, result }) => {
				expect(isValidNumber(arg)).toBe(result)
				expect(isNotValidNumber(arg)).not.toBe(result)
			}
		)

		it.each`
			arg          | result
			${null}      | ${true}
			${undefined} | ${false}
			${true}      | ${false}
			${false}     | ${false}
			${'test'}    | ${false}
			${123}       | ${false}
			${NaN}       | ${false}
		`('isNull with arg = $arg should return $result', ({ arg, result }) => {
			expect(isNull(arg)).toBe(result)
			expect(isNotNull(arg)).not.toBe(result)
		})

		it.each`
			arg          | result
			${null}      | ${true}
			${undefined} | ${true}
			${true}      | ${false}
			${false}     | ${false}
			${'test'}    | ${false}
			${123}       | ${false}
			${NaN}       | ${false}
		`(
			'isNoStrictNull with arg = $arg should return $result',
			({ arg, result }) => {
				expect(isNoStrictNull(arg)).toBe(result)
				expect(isNotNoStrictNull(arg)).not.toBe(result)
			}
		)
	})
})
