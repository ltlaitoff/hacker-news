import { NumbericFiltersProp } from './numbericFiltersToString.interfaces'

export const numbericFiltersToString = (value: NumbericFiltersProp) => {
	const array = Object.values(value)
	const filteredArray = array.filter(value => value !== '')

	return filteredArray.join(',')
}
