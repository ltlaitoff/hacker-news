import { FilterBase, FilterBaseType, FilterBaseName } from '../filters'

type FilterStrinFiltrations = 'is' | 'is except'
type FilterStringElementType = string

interface FilterStringBase extends FilterBase {
	type: FilterBaseType.STRING
	name: FilterBaseName.AUTHOR
}

export interface FilterStringTemplate extends FilterStringBase {
	filtrations: Array<FilterStrinFiltrations>
}

export interface FilterStringReceived extends FilterStringBase {
	filtration: FilterStrinFiltrations
	value: FilterStringElementType
}
