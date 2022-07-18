import { getFromAPI } from './fetch'
import { getBySearchURL, getItemInfoURL, getUserInfoURL } from './functions'
import { Item, Search, User } from './api.interfaces'
import { GetBySearchURL } from './functions/getBySearchURL/getBySearchURL.interfaces'

export const getItemInfo = (id: number): Promise<Item> => {
	return getFromAPI(getItemInfoURL(id))
}

export const getUserInfo = (username: string): Promise<User> => {
	return getFromAPI(getUserInfoURL(username))
}

export const getBySearch = ({
	searchValue,
	filters,
	page,
	sorting = 'DEFAULT'
}: GetBySearchURL): Promise<Search> => {
	return getFromAPI(getBySearchURL({ searchValue, filters, page, sorting }))
}
