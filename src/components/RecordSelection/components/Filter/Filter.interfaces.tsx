import { FilterReceived, FilterTemplate } from 'typescript'

export interface FilterProps {
	filters: FilterTemplate[]
	currentFilters: FilterReceived[]
	onChange: (value: FilterReceived[]) => void
	className?: string
}

export type FilterPosition = {
	left: number
	top: number
}
