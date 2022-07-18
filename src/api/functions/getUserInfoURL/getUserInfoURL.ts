import { USER_URL_TEMPLATE } from 'api/constants'

export const getUserInfoURL = (username: string) => {
	return USER_URL_TEMPLATE + username
}
