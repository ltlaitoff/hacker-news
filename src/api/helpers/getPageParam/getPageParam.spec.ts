import { getPageParam } from '.'

const PAGE_DEFAULT_VALUE = 10

jest.mock('../../constants', () => ({
	PAGE_DEFAULT_VALUE
}))

describe('api/helpers/getPageParam', () => {
	it.each`
		pageNumber
		${1}
		${2}
		${5}
		${6}
		${47}
	`(
		'getPageParam with page = $pageNumber should return "$pageNumber"',
		({ pageNumber }) => {
			expect(getPageParam(pageNumber)).toBe(String(pageNumber))
		}
	)

	it.each`
		pageNumber
		${-1}
		${'test'}
		${NaN}
		${Infinity}
		${'jasd'}
	`(
		`getPageParam with not valid page = $pageNumber should return default value = ${PAGE_DEFAULT_VALUE}`,
		({ pageNumber }) => {
			expect(getPageParam(pageNumber)).toBe(String(PAGE_DEFAULT_VALUE))
		}
	)
})
