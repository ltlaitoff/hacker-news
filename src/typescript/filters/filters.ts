import { FilterDateTemplate, FilterDateReceived } from './filtersDate'
import { FilterNumberTemplate, FilterNumberReceived } from './filtersNumber'
import { FilterListTemplate, FilterListReceived } from './filtersList'
import { FilterStringTemplate, FilterStringReceived } from './filtersString'

export const enum FilterBaseType {
	DATE = 'date',
	NUMBER = 'number',
	LIST = 'list',
	STRING = 'string'
}

export const enum FilterBaseName {
	DATE = 'date',
	COMMENTS = 'comments',
	POINTS = 'points',
	TAGS = 'tags',
	AUTHOR = 'author'
}

export interface FilterBase {
	id: number
	type: FilterBaseType
	name: FilterBaseName
}

export type FilterTemplate =
	| FilterDateTemplate
	| FilterNumberTemplate
	| FilterListTemplate
	| FilterStringTemplate

export type FilterReceived =
	| FilterDateReceived
	| FilterNumberReceived
	| FilterListReceived
	| FilterStringReceived
