import {
	someElementIsNaN,
	someArrayElementIsNaN,
	someElementIsNoNumber,
	someArrayElementIsNoNumber,
	someElementIsFalse,
	someArrayElementIsFalse,
	someElementIsStrictFalse,
	someArrayElementIsStrictFalse,
	someElementIsNull,
	someArrayElementIsNull
} from './someElementIs'

import {
	someElementIsNotNaN,
	someArrayElementIsNotNaN,
	someElementIsNotNoNumber,
	someArrayElementIsNotNoNumber,
	someElementIsNotFalse,
	someArrayElementIsNotFalse,
	someElementIsStrictNotFalse,
	someArrayElementIsStrictNotFalse,
	someElementIsNotNull,
	someArrayElementIsNotNull
} from './someElementIsNot'

describe('someElementIs', () => {
	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${true}
		${[2, NaN]}           | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${false}
	`(
		'someElementIsNaN, with arg(with spread) = $arg should return $result',
		({ arg, result }) => {
			expect(someElementIsNaN(...arg)).toBe(result)
			expect(someElementIsNotNaN(...arg)).not.toBe(result)
		}
	)

	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${true}
		${[2, NaN]}           | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${false}
	`(
		'someArrayElementIsNaN with arg = $arg should return $result',
		({ arg, result }) => {
			expect(someArrayElementIsNaN(arg)).toBe(result)
			expect(someArrayElementIsNotNaN(arg)).not.toBe(result)
		}
	)

	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${false}
		${[2, NaN]}           | ${false}
		${[2, false]}         | ${true}
		${[2, true]}          | ${true}
		${[2, true]}          | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${true}
	`(
		'someElementIsNoNumber with arg(with spread) = $arg should return $result',
		({ arg, result }) => {
			expect(someElementIsNoNumber(...arg)).toBe(result)
			expect(someElementIsNotNoNumber(...arg)).not.toBe(result)
		}
	)

	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${false}
		${[2, NaN]}           | ${false}
		${[2, false]}         | ${true}
		${[2, true]}          | ${true}
		${[2, true]}          | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${true}
	`(
		'someElementIsNoNumber with arg = $arg should return $result',
		({ arg, result }) => {
			expect(someArrayElementIsNoNumber(arg)).toBe(result)
			expect(someArrayElementIsNotNoNumber(arg)).not.toBe(result)
		}
	)

	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${true}
		${[2, NaN]}           | ${true}
		${[2, 4, false]}      | ${true}
		${[2, 4, true]}       | ${false}
		${[2, false]}         | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${true}
	`(
		'someElementIsFalse with arg(with spread) = $arg should return $result',
		({ arg, result }) => {
			expect(someElementIsFalse(...arg)).toBe(result)
			expect(someElementIsNotFalse(...arg)).not.toBe(result)
		}
	)

	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${true}
		${[2, NaN]}           | ${true}
		${[2, 4, false]}      | ${true}
		${[2, 4, true]}       | ${false}
		${[2, false]}         | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${true}
	`(
		'someArrayElementIsFalse with arg = $arg should return $result',
		({ arg, result }) => {
			expect(someArrayElementIsFalse(arg)).toBe(result)
			expect(someArrayElementIsNotFalse(arg)).not.toBe(result)
		}
	)

	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${false}
		${[2, NaN]}           | ${false}
		${[2, 4, false]}      | ${true}
		${[2, 4, true]}       | ${false}
		${[2, false]}         | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${false}
	`(
		'someElementIsStrictFalse with arg(with spread) = $arg should return $result',
		({ arg, result }) => {
			expect(someElementIsStrictFalse(...arg)).toBe(result)
			expect(someElementIsStrictNotFalse(...arg)).not.toBe(result)
		}
	)

	it.each`
		arg                   | result
		${[NaN, 2, 4]}        | ${false}
		${[2, NaN]}           | ${false}
		${[2, 4, false]}      | ${true}
		${[2, 4, true]}       | ${false}
		${[2, false]}         | ${true}
		${[4, 2, 4]}          | ${false}
		${[null, null, null]} | ${false}
	`(
		'someArrayElementIsStrictFalse with arg = $arg should return $result',
		({ arg, result }) => {
			expect(someArrayElementIsStrictFalse(arg)).toBe(result)
			expect(someArrayElementIsStrictNotFalse(arg)).not.toBe(result)
		}
	)

	it.each`
		arg                  | result
		${[null, 2, 'test']} | ${true}
		${[2, NaN]}          | ${false}
		${['fgh', 4, false]} | ${false}
		${[2, 4, true]}      | ${false}
		${[2, false]}        | ${false}
		${[4, 0, 4]}         | ${false}
		${[]}                | ${false}
	`(
		'someElementIsNull with arg = $arg should return $result',
		({ arg, result }) => {
			expect(someElementIsNull(...arg)).toBe(result)
			expect(someElementIsNotNull(...arg)).not.toBe(result)
		}
	)

	it.each`
		arg                | result
		${[null, 2, 4]}    | ${true}
		${[2, NaN]}        | ${false}
		${[2, 'g', false]} | ${false}
		${[2, 4, true]}    | ${false}
		${['f', false]}    | ${false}
		${[4, 2, 4]}       | ${false}
		${[]}              | ${false}
	`(
		'someElementIsNull with arg = $arg should return $result',
		({ arg, result }) => {
			expect(someArrayElementIsNull(arg)).toBe(result)
			expect(someArrayElementIsNotNull(arg)).not.toBe(result)
		}
	)
})
