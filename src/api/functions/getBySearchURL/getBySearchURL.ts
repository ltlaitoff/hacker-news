import { APIParameters } from '../../api.interfaces'
import { SEARCH_URL_TEMPLATE } from '../../constants'
import {
	getPageParam,
	getQueryParam,
	getSearchType,
	getTagsAndNumericFiltersParam,
	getUrlParams
} from '../../helpers'
import { GetBySearchURL } from './getBySearchURL.interfaces'

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
