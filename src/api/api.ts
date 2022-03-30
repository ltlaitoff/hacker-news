import axios from 'axios'
import { Item, User, Search } from './api.interfaces'

const ITEM_URL_TEMPLATE: string = 'http://hn.algolia.com/api/v1/items/'
const USER_URL_TEMPLATE: string = 'http://hn.algolia.com/api/v1/users/'
const SEARCH_URL_TEMPLATE: string = 'http://hn.algolia.com/api/v1/search'
const SEARCH_BY_DATE_URL_TEMPLATE: string =
	'http://hn.algolia.com/api/v1/search_by_date'

/* 
	TODO: Create Search by date #4 (https://github.com/ltlaitoff/hacker-news/issues/4)
*/

const getItemUrl = (id: number): string => ITEM_URL_TEMPLATE + String(id)
const getUserUrl = (username: string): string => USER_URL_TEMPLATE + username
const getSearchUrl = (
	query: string = '',
	tags: Array<string> = [''],
	numericFilters: Array<string> = [''],
	page: number = 0
): string => {
	const params = `?query=${query}&tags=(${tags?.join(
		''
	)})&numericFilters=${numericFilters?.join(',')}&page=${page}`

	return SEARCH_URL_TEMPLATE + params
}

export const getItemInfo = (id: number): Promise<Item> => {
	return axios.get(getItemUrl(id))
}

export const getUserInfo = (username: string): Promise<User> => {
	return axios.get(getUserUrl(username))
}

export const getBySearch = (
	query?: string,
	tags?: Array<string> | string,
	numericFilters?: string,
	page?: number
): Promise<Search> => {
	let tagsParam: Array<string> | undefined =
		typeof tags === 'string' ? [tags] : tags

	let numericFiltersParam: Array<string> | undefined =
		typeof numericFilters === 'string' ? [numericFilters] : numericFilters

	return axios.get(getSearchUrl(query, tagsParam, numericFiltersParam, page))
}
