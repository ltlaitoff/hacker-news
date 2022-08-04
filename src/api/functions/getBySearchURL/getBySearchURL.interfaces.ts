import { FilterReceived } from 'typescript'
import { SEARCH_TYPES } from '../../constants'

export type GetBySearchURL = {
	searchValue: string
	filters: FilterReceived[]
	page: number
	sorting?: keyof typeof SEARCH_TYPES
}
