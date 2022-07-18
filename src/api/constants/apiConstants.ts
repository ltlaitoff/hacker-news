const BASE_URL = 'http://hn.algolia.com/api/v1/'

export const ITEM_URL_TEMPLATE: string = BASE_URL + 'items/'
export const USER_URL_TEMPLATE: string = BASE_URL + 'users/'
export const SEARCH_URL_TEMPLATE: string = BASE_URL + ''

export enum SEARCH_TYPES {
	DEFAULT = 'search',
	DATE = 'search_by_date'
}
