import { getFromAPI } from '.'

const mockAxiosGet = jest.fn()

jest.mock('axios', () => {
	return {
		get: (url: string) => mockAxiosGet(url)
	}
})

describe('api/getFromAPI', () => {
	it.each`
		url
		${'test'}
		${'url'}
		${'random text'}
	`('getFromAPI with url = $url should call axios.get with $url', ({ url }) => {
		getFromAPI(url)

		expect(mockAxiosGet).toBeCalledWith(url)
	})
})
