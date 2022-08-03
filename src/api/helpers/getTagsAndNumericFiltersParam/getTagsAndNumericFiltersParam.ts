import { APIParameters, NumericFilters } from 'api/api.interfaces'
import { FilterBaseName, FilterReceived } from 'typescript/filters'
import {
	onTypeIsNumber,
	onTypeIsList,
	onTypeIsDate,
	onTypeIsString
} from './functions'

type NumbericFilters = {
	[NumericFilters.COMMENTS]: string
	[NumericFilters.POINTS]: string
	[NumericFilters.DATE]: string
}

type TAGS = {
	[APIParameters.AUTHOR]: string
	[APIParameters.TAGS]: string
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

const tagsToString = (value: TAGS) => {
	const resultArray = [
		value[APIParameters.AUTHOR],
		value[APIParameters.TAGS]
	].filter(value => value !== '')

	return resultArray.join(',')
}

/*
	TODO: Rename it
*/
export const getTagsAndNumericFiltersParam = (
	filters: FilterReceived[]
): getTagsAndNumericFiltersParamReturnType => {
	const result = {
		[APIParameters.TAGS]: {
			[APIParameters.AUTHOR]: '',
			[APIParameters.TAGS]: ''
		},
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
			case FilterBaseName.TAGS: {
				result[APIParameters.TAGS][APIParameters.TAGS] = onTypeIsList(filter)
				break
			}

			case FilterBaseName.COMMENTS: {
				result[APIParameters.NUMBERIC_FILTERS][NumericFilters.COMMENTS] =
					onTypeIsNumber(filter)
				break
			}

			case FilterBaseName.POINTS: {
				result[APIParameters.NUMBERIC_FILTERS][NumericFilters.POINTS] =
					onTypeIsNumber(filter)
				break
			}

			case FilterBaseName.DATE: {
				result[APIParameters.NUMBERIC_FILTERS][NumericFilters.DATE] =
					onTypeIsDate(filter)
				break
			}

			case FilterBaseName.AUTHOR: {
				result[APIParameters.TAGS][APIParameters.AUTHOR] = onTypeIsString(
					filter,
					{ key: FilterBaseName.AUTHOR }
				)
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
		[APIParameters.TAGS]: tagsToString(result[APIParameters.TAGS]),
		[APIParameters.NUMBERIC_FILTERS]: numbericFiltersToString(
			result[APIParameters.NUMBERIC_FILTERS]
		)
	}

	return finalResult
}
