const BASE_URL = 'https://hn.algolia.com/api/v1/'

export const ITEM_URL_TEMPLATE: string = BASE_URL + 'items/'
export const USER_URL_TEMPLATE: string = BASE_URL + 'users/'
export const SEARCH_URL_TEMPLATE: string = BASE_URL + ''

export enum SEARCH_TYPES {
	DEFAULT = 'search',
	DATE = 'search_by_date'
}

export const PAGE_DEFAULT_VALUE = 0
export const ON_TYPE_IS_LIST_DEFAULT = ''
