import { getQueryParam } from '.'

describe('api/helpers/getQueryParam', () => {
	it.each`
		arg
		${'hello'}
		${'test'}
		${'QUERY'}
		${'WDYT'}
	`('getQueryParam with arg = $arg should return $arg', ({ arg }) => {
		expect(getQueryParam(arg)).toBe(arg)
	})
})
