import { Filter } from 'data/filters.interfaces'
import {
	DateStandartFiltrationsKeys,
	DateSpecicalFiltrationsKeys
} from './components/FilterDetailsWindow'

export interface FilterProps {
	filters: Filter[]
	currentFilters: CurrentFiltersItem[]
	onChange: (value: CurrentFiltersItem[]) => void
	className?: string
}

type StandartFiltrationsItem = {
	id: number
	name: string
	key: DateStandartFiltrationsKeys
	value: Date
}

type SpecicalFiltrationsItem = {
	id: number
	name: string
	key: DateSpecicalFiltrationsKeys
	value: [Date, Date]
}

export type CurrentFiltersItem =
	| StandartFiltrationsItem
	| SpecicalFiltrationsItem

export type FilterPosition = {
	left: number
	top: number
}
