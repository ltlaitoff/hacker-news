import { PAGE_DEFAULT_VALUE } from '../../constants'

export const getPageParam = (page: number): string => {
	if (!isFinite(page) || page < 0) {
		return String(PAGE_DEFAULT_VALUE)
	}

	return String(page)
}
