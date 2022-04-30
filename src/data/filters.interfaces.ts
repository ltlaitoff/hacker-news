export type Filter = DateFilterType

export type FilterTypes = 'text' | 'date'

interface FilterBase {
	id: number
	label: string
	type: FilterTypes
}

export interface DateFilterType extends FilterBase {
	type: 'date'
	standartFiltrations?: DateStandartFiltrations
	specicalFiltrations?: DateSpecicalFiltrations
}

export interface DateStandartFiltrations {
	is?: (fieldName: string, value: string) => string
	'is before'?: (fieldName: string, value: string) => string
	'is after'?: (fieldName: string, value: string) => string
	'is on or before'?: (fieldName: string, value: string) => string
	'is on or after'?: (fieldName: string, value: string) => string
}

export interface DateSpecicalFiltrations {
	'is within'?: (
		fieldName: string,
		firstValue: string,
		secondValue: string
	) => string
}
