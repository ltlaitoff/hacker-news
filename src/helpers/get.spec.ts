import { getFilledArray } from './get'

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
})
