import { SEARCH_TYPES } from '../../constants'

type ReverseMap<T> = T[keyof T]

export const getSearchType = (
	value: keyof typeof SEARCH_TYPES
): ReverseMap<typeof SEARCH_TYPES> => {
	return SEARCH_TYPES[value]
}
