import { getFilledArray, getOrderedNumbers, getUniqueArray } from './get'

describe('get', () => {
	it.each`
		length | value  | result
		${1}   | ${1}   | ${[1]}
		${5}   | ${'1'} | ${['1', '1', '1', '1', '1']}
		${0}   | ${'1'} | ${[]}
		${-1}  | ${'1'} | ${[]}
	`(
		'getFilledArray with length = $length, value = $value should return $result',
		({ length, value, result }) => {
			expect(getFilledArray(length, value)).toStrictEqual(result)
		}
	)

	it.each`
		first | second | result
		${1}  | ${1}   | ${[1, 1]}
		${5}  | ${1}   | ${[1, 5]}
		${7}  | ${6}   | ${[6, 7]}
		${1}  | ${10}  | ${[1, 10]}
	`(
		'getOrderedNumbers with first = $first, second = $second should return $result',
		({ first, second, result }) => {
			expect(getOrderedNumbers(first, second)).toStrictEqual(result)
		}
	)

	it.each`
		array                    | result
		${[]}                    | ${[]}
		${[1]}                   | ${[1]}
		${[1, 1, 1]}             | ${[1]}
		${[1, 1, 2]}             | ${[1, 2]}
		${[1, 15, 2, 15, 3, 15]} | ${[1, 15, 2, 3]}
	`(
		'getUniqueArray with array = $array should return $result',
		({ array, result }) => {
			expect(getUniqueArray(array)).toStrictEqual(result)
		}
	)
})
