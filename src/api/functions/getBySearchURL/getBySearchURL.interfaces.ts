import { APIParameters, NumericFilters } from '../../api.interfaces'
import { FilterReceived } from 'typescript'
import { SEARCH_TYPES } from '../../constants'

export type GetBySearchURL = {
	searchValue: string
	filters: FilterReceived[]
	page: number
	sorting?: keyof typeof SEARCH_TYPES
}

export type getQueryParamReturnType = {
	[APIParameters.QUERY]: string
}

export type NumbericFilters = {
	[NumericFilters.COMMENTS]: string
	[NumericFilters.POINTS]: string
	[NumericFilters.DATE]: string
}

export type getTagsAndNumericFiltersParamReturnType = {
	[APIParameters.TAGS]: string
	[APIParameters.NUMBERIC_FILTERS]: string
}

export type getPageParamReturnType = {
	[APIParameters.PAGE]: number
}
