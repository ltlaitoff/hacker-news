import { FilterBase, FilterBaseType, FilterBaseName } from '../filters'

type FilterNumberOneElementFiltrations =
	| 'is'
	| 'is bigger'
	| 'is lower'
	| 'is on or bigger'
	| 'is on or lower'
type FilterNumberTwoElementFiltrations = 'is between'
type FilterNumberElementType = number

interface FilterNumberBase extends FilterBase {
	type: FilterBaseType.NUMBER
	name: FilterBaseName.COMMENTS | FilterBaseName.POINTS
}

export interface FilterNumberTemplate extends FilterNumberBase {
	filtrations: Array<
		FilterNumberOneElementFiltrations | FilterNumberTwoElementFiltrations
	>
}

interface FilterNumberReceivedOneElementFiltration extends FilterNumberBase {
	filtration: FilterNumberOneElementFiltrations
	value: FilterNumberElementType
}

interface FilterNumberReceivedTwoElementFiltration extends FilterNumberBase {
	filtration: FilterNumberTwoElementFiltrations
	value: [FilterNumberElementType, FilterNumberElementType]
}

export type FilterNumberReceived =
	| FilterNumberReceivedOneElementFiltration
	| FilterNumberReceivedTwoElementFiltration
