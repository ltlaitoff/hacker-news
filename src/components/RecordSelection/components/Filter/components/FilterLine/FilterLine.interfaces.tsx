import { Filter } from 'data/filters.interfaces'
import { CurrentFiltersItem } from '../../Filter.interfaces'

export interface FilterLineProps {
	allFilters: Filter[]
	currentFilters: CurrentFiltersItem[]
	onAddClick: (ref: HTMLButtonElement | null) => void
	onItemClick: (id: number, ref: HTMLDivElement) => void
	onItemDeleteClick: (id: number) => void
	className?: string
}
