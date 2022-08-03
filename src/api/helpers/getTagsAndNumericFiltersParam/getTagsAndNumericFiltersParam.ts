import { APIParameters, NumericFilters } from '../../api.interfaces'
import { FilterBaseName, FilterReceived } from 'typescript/filters'
import {
	onTypeIsNumber,
	onTypeIsList,
	onTypeIsDate,
	onTypeIsString
} from './functions'
import { GetTagsAndNumericFiltersParamReturnType } from './getTagsAndNumericFiltersParam.interfaces'
import { numbericFiltersToString, tagsToString } from './helpers'

/*
	TODO: Rename it
*/

export const getTagsAndNumericFiltersParam = (
	filters: FilterReceived[]
): GetTagsAndNumericFiltersParamReturnType => {
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

	const finalResult = {
		[APIParameters.TAGS]: tagsToString(result[APIParameters.TAGS]),
		[APIParameters.NUMBERIC_FILTERS]: numbericFiltersToString(
			result[APIParameters.NUMBERIC_FILTERS]
		)
	}

	return finalResult
}
