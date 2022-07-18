import { APIParameters } from 'api/api.interfaces'
import { FilterReceived } from 'typescript'
import { SEARCH_URL_TEMPLATE, SEARCH_TYPES } from '../../constants'
import {
	getPageParam,
	getQueryParam,
	getSearchType,
	getTagsAndNumericFiltersParam,
	getUrlParams
} from './helpers'

type GetBySearchURL = {
	searchValue: string
	filters: FilterReceived[]
	page: number
	sorting?: keyof typeof SEARCH_TYPES
}

/*
	Tests: https://www.notion.so/getBySearchURL-tests-af65c970a7004237b7010f91ea2b5902
*/
export const getBySearchURL = ({
	searchValue,
	filters,
	page,
	sorting = 'DEFAULT'
}: GetBySearchURL): string => {
	const searchType = getSearchType(sorting)

	const tagsAndNumericFilters = getTagsAndNumericFiltersParam(filters)

	const params = {
		[APIParameters.QUERY]: getQueryParam(searchValue),
		[APIParameters.PAGE]: getPageParam(page),
		[APIParameters.TAGS]: tagsAndNumericFilters[APIParameters.TAGS],
		[APIParameters.NUMBERIC_FILTERS]:
			tagsAndNumericFilters[APIParameters.NUMBERIC_FILTERS]
	}

	const paramsString = getUrlParams(params)

	return SEARCH_URL_TEMPLATE + searchType + paramsString
}
