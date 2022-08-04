import { FilterBase, FilterBaseType, FilterBaseName } from '../filters'

type FilterStringFiltrations = 'is'
type FilterStringElementType = string

interface FilterStringBase extends FilterBase {
	type: FilterBaseType.STRING
	name: FilterBaseName.AUTHOR
}

export interface FilterStringTemplate extends FilterStringBase {
	filtrations: Array<FilterStringFiltrations>
}

export interface FilterStringReceived extends FilterStringBase {
	filtration: FilterStringFiltrations
	value: FilterStringElementType
}
