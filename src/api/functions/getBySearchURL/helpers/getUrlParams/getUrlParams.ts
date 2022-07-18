import { APIParameters } from '../../../../api.interfaces'

type getUrlParamsType = {
	[APIParameters.QUERY]: string
	[APIParameters.PAGE]: string
	[APIParameters.TAGS]: string
	[APIParameters.NUMBERIC_FILTERS]: string
}

export const getUrlParams = (params: getUrlParamsType) => {
	const result: string[] = []

	Object.entries(params).forEach(([key, name]) => {
		if (name !== '') {
			result.push(`${key}=${name}`)
		}
	})

	if (result.length === 0) {
		return ''
	}

	return '?' + result.join('&')
}
