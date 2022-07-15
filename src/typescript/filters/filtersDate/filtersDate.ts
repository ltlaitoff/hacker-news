import { FilterBase, FilterBaseType, FilterBaseName } from '../filters'

type FilterDateOneElementFiltrations =
	| 'is'
	| 'is before'
	| 'is after'
	| 'is on or before'
	| 'is on or after'
type FilterDateTwoElementFiltrations = 'is within'
type FilterDateElementType = Date

interface FilterDateBase extends FilterBase {
	type: FilterBaseType.DATE
	name: FilterBaseName.DATE
}

export interface FilterDateTemplate extends FilterDateBase {
	filtrations: Array<
		FilterDateOneElementFiltrations | FilterDateTwoElementFiltrations
	>
}

interface FilterDateReceivedOneElementFiltration extends FilterDateBase {
	filtration: FilterDateOneElementFiltrations
	value: FilterDateElementType
}

interface FilterDateReceivedTwoElementFiltration extends FilterDateBase {
	filtration: FilterDateTwoElementFiltrations
	value: [FilterDateElementType, FilterDateElementType]
}

export type FilterDateReceived =
	| FilterDateReceivedOneElementFiltration
	| FilterDateReceivedTwoElementFiltration
