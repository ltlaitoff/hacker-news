import { FilterBase, FilterBaseType, FilterBaseName } from '../filters'

type FilterListTagsValues =
	| 'all'
	| 'story'
	| 'comment'
	| 'poll'
	| 'pollopt'
	| 'show_hn'
	| 'ask_hn'
	| 'front_page'
type FilterListFiltrations = 'is' | 'is except'

interface FilterListBase extends FilterBase {
	type: FilterBaseType.LIST
	name: FilterBaseName.TAGS
	listValues: Array<FilterListTagsValues>
}

export interface FilterListTemplate extends FilterListBase {
	filtrations: Array<FilterListFiltrations>
}

export interface FilterListReceived extends FilterListBase {
	filtration: FilterListFiltrations
	value: FilterListTagsValues
}
