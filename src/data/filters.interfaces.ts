import { RequireAtLeastOne } from 'typescript/requireAtLeastOne'

export type Filter = DateFilterType

export type FilterTypes = 'date'

interface FilterBase {
	id: number
	label: string
	type: FilterTypes
}

export interface DateFilterType extends FilterBase {
	readonly type: 'date'
	readonly standartFiltrations?: DateStandartFiltrations
	readonly specicalFiltrations?: DateSpecicalFiltrations
}

/* DateStandartFiltrations */
export type DateStandartFiltrationsFunction = (
	fieldName: string,
	value: string
) => string
interface DateStandartFiltrationsBase {
	is?: DateStandartFiltrationsFunction
	'is before'?: DateStandartFiltrationsFunction
	'is after'?: DateStandartFiltrationsFunction
	'is on or before'?: DateStandartFiltrationsFunction
	'is on or after'?: DateStandartFiltrationsFunction
}

export type DateStandartFiltrations =
	RequireAtLeastOne<DateStandartFiltrationsBase>

/* DateSpecicalFiltrations */
export type SpecialDateTypes = 'two'
export type DateSpecicalFiltrationsFunction = (
	fieldName: string,
	firstValue: string,
	secondValue: string
) => string

interface DateSpecicalFiltrationsBase {
	'is within'?: {
		type: SpecialDateTypes
		getResult: DateSpecicalFiltrationsFunction
	}
}

export type DateSpecicalFiltrations =
	RequireAtLeastOne<DateSpecicalFiltrationsBase>
