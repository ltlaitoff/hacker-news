import {
	getItemInfo as getItemInfoAPI,
	getUserInfo as getUserInfoAPI,
	getBySearch as getBySearchAPI
} from './api'
import { Item, Search, User } from './api.interfaces'
import { selectFilters, selectSearch, store } from 'store'
import { PageNames } from 'routes'
import {
	getDateSpecicalFiltrationFunc,
	getDateStandartFiltrationFunc
} from 'data/filters'

export const getItemInfo = (id: number): Promise<Item> => {
	return getItemInfoAPI(id)
}

export const getUserInfo = (username: string): Promise<User> => {
	return getUserInfoAPI(username)
}

type getBySearchType = {
	tags?: Array<string> | string
	searchByDate?: boolean
	pageName: PageNames
	page?: number
}

export const getBySearch = ({
	tags,
	searchByDate,
	pageName,
	page
}: getBySearchType): Promise<Search> => {
	const reduxState = store.getState()

	const query = selectSearch(reduxState, pageName)
	const filters = selectFilters(reduxState, pageName)

	const filtersAsString = filters.map(element => {
		if (element.key === 'is within') {
			return getDateSpecicalFiltrationFunc(element.key)(
				'created_at_i',
				String(element.value[1].getTime() / 1000),
				String(element.value[0].getTime() / 1000)
			)
		}

		return getDateStandartFiltrationFunc(element.key)(
			'created_at_i',
			String(element.value.getTime() / 1000)
		)
	})

	const numericFilters = filtersAsString.join('&')

	return getBySearchAPI({
		query,
		tags,
		page,
		numericFilters,
		searchByDate
	})
}
