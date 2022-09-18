import { getFilledArray, getOrderedNumbers } from './get'

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
})
