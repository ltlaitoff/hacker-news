import {
	DateSpecicalFiltrations,
	DateStandartFiltrations,
	Filter
} from 'data/filters.interfaces'
import { CSSProperties } from 'react'
import { CurrentFiltersItem } from '../../Filter.interfaces'

export type DateStandartFiltrationsKeys = keyof DateStandartFiltrations
export type DateSpecicalFiltrationsKeys = keyof DateSpecicalFiltrations

export type DateStandartFiltrationsKeysArray =
	Array<DateStandartFiltrationsKeys>
export type DateSpecicalFiltrationsKeysArray =
	Array<DateSpecicalFiltrationsKeys>

type onSubmitTypeStandart = {
	key: DateStandartFiltrationsKeys
	value: Date
}

type onSubmitTypeSpecical = {
	key: DateSpecicalFiltrationsKeys
	value: [Date, Date]
}

export type onSubmitType = onSubmitTypeStandart | onSubmitTypeSpecical

export interface FilterDetailsWindowProps {
	filter: Filter
	currentFilter: CurrentFiltersItem | null
	onSubmit: (value: onSubmitType) => void
	onClose: () => void
	className?: string
	style?: CSSProperties
}

export type Filtrations = {
	standart: DateStandartFiltrationsKeysArray
	special: DateSpecicalFiltrationsKeysArray
}
