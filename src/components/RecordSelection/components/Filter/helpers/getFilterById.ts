import { isNull } from 'helpers'

function getFilterById<T extends { id: number }>(
	filters: T[],
	id: number | null
): T | null {
	if (isNull(id)) return null

	const item = filters.filter(filter => filter.id === id)[0]

	return item !== undefined ? item : null
}

export { getFilterById }
