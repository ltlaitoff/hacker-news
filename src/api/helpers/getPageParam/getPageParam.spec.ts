import { getPageParam } from '.'

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
})
