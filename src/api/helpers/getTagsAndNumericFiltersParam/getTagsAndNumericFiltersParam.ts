import { APIParameters, NumericFilters } from 'api/api.interfaces'
import { FilterReceived } from 'typescript'
import { onTypeIsNumber, onTypeIsList, onTypeIsDate } from './functions'

type NumbericFilters = {
	[NumericFilters.COMMENTS]: string
	[NumericFilters.POINTS]: string
	[NumericFilters.DATE]: string
}

type getTagsAndNumericFiltersParamReturnType = {
	[APIParameters.TAGS]: string
	[APIParameters.NUMBERIC_FILTERS]: string
}

const numbericFiltersToString = (value: NumbericFilters) => {
	console.log(value)
	const array = Object.values(value)
	const filteredArray = array.filter(value => value !== '')

	return filteredArray.join(',')
}

export const getTagsAndNumericFiltersParam = (
	filters: FilterReceived[]
): getTagsAndNumericFiltersParamReturnType => {
	const result = {
		[APIParameters.TAGS]: '',
		[APIParameters.NUMBERIC_FILTERS]: {
			[NumericFilters.COMMENTS]: '',
			[NumericFilters.POINTS]: '',
			[NumericFilters.DATE]: ''
		}
	}

	/*
		Вынести forEach в отдельную функцию

	*/

	filters.forEach(filter => {
		switch (filter.name) {
			case 'tags': {
				result[APIParameters.TAGS] = onTypeIsList(filter)
				break
			}

			case 'comments': {
				result[APIParameters.NUMBERIC_FILTERS][NumericFilters.COMMENTS] =
					onTypeIsNumber(filter)
				break
			}

			case 'points': {
				result[APIParameters.NUMBERIC_FILTERS][NumericFilters.POINTS] =
					onTypeIsNumber(filter)
				break
			}

			case 'date': {
				result[APIParameters.NUMBERIC_FILTERS][NumericFilters.DATE] =
					onTypeIsDate(filter)
				break
			}

			default: {
				throw new Error('Invalid filter name')
			}
		}
	})

	/*
		TODO: NumericFilter -> string
	*/

	const finalResult = {
		[APIParameters.TAGS]: result[APIParameters.TAGS],
		[APIParameters.NUMBERIC_FILTERS]: numbericFiltersToString(
			result[APIParameters.NUMBERIC_FILTERS]
		)
	}

	return finalResult
}
