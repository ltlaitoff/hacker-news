import axios from 'axios'

export function getFromAPI<ResultType>(url: string): Promise<ResultType> {
	return axios.get(url)
}
