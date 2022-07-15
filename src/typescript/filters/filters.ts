import { FilterDateTemplate, FilterDateReceived } from './filtersDate'
import { FilterNumberTemplate, FilterNumberReceived } from './filtersNumber'
import { FilterListTemplate, FilterListReceived } from './filtersList'

export enum FilterBaseType {
	DATE = 'date',
	NUMBER = 'number',
	LIST = 'list'
}

export enum FilterBaseName {
	DATE = 'date',
	COMMENTS = 'comments',
	POINTS = 'points',
	TAGS = 'tags'
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

export type FilterReceived =
	| FilterDateReceived
	| FilterNumberReceived
	| FilterListReceived
