import { USER_URL_TEMPLATE } from '../../constants'

export const getUserInfoURL = (username: string) => {
	return USER_URL_TEMPLATE + username
}
