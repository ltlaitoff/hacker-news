import axios from 'axios'
import {
	Item,
	User,
	Search,
	getSearchUrlProps,
	getBySearchProps,
	numericFilters,
	numericFiltersElement
} from './api.interfaces'

const ITEM_URL_TEMPLATE: string = 'http://hn.algolia.com/api/v1/items/'
const USER_URL_TEMPLATE: string = 'http://hn.algolia.com/api/v1/users/'
const SEARCH_URL_TEMPLATE: string = 'http://hn.algolia.com/api/v1/'
const SEARCH_TYPES = {
	default: 'search',
	byDate: 'search_by_date'
}

type conditions = {
	[key: string]: string
}

const CONDITIONS: conditions = {
	less: '<',
	lessOrEqual: '<=',
	equal: '=',
	greated: '>',
	greaterOrEqual: '>='
}

const getItemUrl = (id: number): string => ITEM_URL_TEMPLATE + String(id)
const getUserUrl = (username: string): string => USER_URL_TEMPLATE + username

const getNumericFilters = (data: numericFilters) => {
	const result: Array<string> = []

	Object.entries(data).forEach(
		([field, value]: [string, numericFiltersElement]) => {
			Object.entries(value).forEach(
				([condition, conditionValues]: [string, Array<number>]) => {
					conditionValues.forEach((conditionValue: number) => {
						result.push(`${field}${CONDITIONS[condition]}${conditionValue}`)
					})
				}
			)
		}
	)

	return result.join(',')
}

const getSearchUrl = ({
	query,
	tags,
	searchByDate,
	numericFilters,
	page
}: getSearchUrlProps): string => {
	let searchType = SEARCH_TYPES.default

	if (searchByDate || numericFilters) {
		searchType = SEARCH_TYPES.byDate
	}

	const tagsParam = tags ? tags.join(',') : ''
	const numericFiltersParams = numericFilters
		? getNumericFilters(numericFilters)
		: ''

	const params = `?query=${query}&tags=(${tagsParam})&numericFilters=${numericFiltersParams}&page=${page}`

	return SEARCH_URL_TEMPLATE + searchType + params
}

export const getItemInfo = (id: number): Promise<Item> => {
	return axios.get(getItemUrl(id))
}

export const getUserInfo = (username: string): Promise<User> => {
	return axios.get(getUserUrl(username))
}

export const getBySearch = ({
	query,
	tags,
	searchByDate,
	numericFilters,
	page
}: getBySearchProps): Promise<Search> => {
	const params = {
		query: query,
		tags: typeof tags === 'string' ? [tags] : tags,
		searchByDate: searchByDate,
		numericFilters: numericFilters,
		page: page
	}

	return axios.get(getSearchUrl({ ...params }))
}
