import { ITEM_URL_TEMPLATE } from '../../constants'

const getItemUrl = (id: number): string => ITEM_URL_TEMPLATE + String(id)

export const getItemInfoURL = (id: number): string => {
	if (id < 0) {
		throw new Error('api getItemInfo error: id must be greated or equals 0')
	}

	return getItemUrl(id)
}
