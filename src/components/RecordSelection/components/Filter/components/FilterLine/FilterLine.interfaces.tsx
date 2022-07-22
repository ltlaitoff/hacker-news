import { FilterTemplate, FilterReceived } from 'typescript'

export interface FilterLineProps {
	allFilters: FilterTemplate[]
	currentFilters: FilterReceived[]
	onAddClick: (ref: HTMLButtonElement | null) => void
	onItemClick: (id: number, ref: HTMLDivElement) => void
	onItemDeleteClick: (id: number) => void
	className?: string
}
