import { getUserInfoURL } from './getUserInfoURL'

jest.mock('../../constants', () => ({
	USER_URL_TEMPLATE: 'template/'
}))

describe('getUserInfoURL', () => {
	it.each`
		value     | result
		${'test'} | ${'template/test'}
		${'gg'}   | ${'template/gg'}
		${'gth'}  | ${'template/gth'}
		${''}     | ${'template/'}
	`(
		'getUserInfoURL with value = $value should return $result',
		({ value, result }) => {
			expect(getUserInfoURL(value)).toBe(result)
		}
	)
})
