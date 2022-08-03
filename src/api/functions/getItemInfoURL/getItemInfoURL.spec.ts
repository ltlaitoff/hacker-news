import { getItemInfoURL } from './getItemInfoURL'

jest.mock('../../constants', () => ({
	ITEM_URL_TEMPLATE: 'template/'
}))

describe('getItemInfoURL', () => {
	it.each`
		value  | result
		${10}  | ${'template/10'}
		${50}  | ${'template/50'}
		${111} | ${'template/111'}
		${0}   | ${'template/0'}
	`(
		'getItemInfoURL with value = $value should return $result',
		({ value, result }) => {
			expect(getItemInfoURL(value)).toBe(result)
		}
	)

	it('getItemInfoURL with value < 0 should throw an error', () => {
		expect(() => getItemInfoURL(-1)).toThrowError(
			'api getItemInfo error: id must be greated or equals 0'
		)
	})
})
