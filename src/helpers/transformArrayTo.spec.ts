import { transformArrayToNumbersArray } from './transformArrayTo'

describe('transformArrayTo', () => {
	it.each`
		arg                                  | result
		${['123', null, 'test']}             | ${[123, 0, NaN]}
		${['5', undefined, false, 'string']} | ${[5, NaN, 0, NaN]}
	`(
		'transformArrayToNumbersArray with arg = $arg should return $result',
		({ arg, result }) => {
			expect(transformArrayToNumbersArray(arg)).toEqual(result)
		}
	)
})
