import {
	FilterDateReceived,
	FilterListReceived,
	FilterNumberReceived,
	FilterReceived,
	FilterStringReceived
} from 'typescript/filters'

type getNameAndFiltration<T extends { name: unknown; filtration: unknown }> =
	Omit<T, 'name' | 'filtration'>

export type FilterValuePickerFilter =
	| getNameAndFiltration<FilterDateReceived>
	| getNameAndFiltration<FilterNumberReceived>
	| getNameAndFiltration<FilterListReceived>
	| getNameAndFiltration<FilterStringReceived>

export type excludeNullFromValue<T extends { value: unknown }> = Omit<
	T,
	'value'
> & {
	value: Exclude<T['value'], null>
}
export interface FilterValuePickerProps {
	filter: FilterValuePickerFilter
	onError: (value: boolean) => void
	error: boolean
	onChange: (value: FilterReceived['value'], type?: 'enterKey' | string) => void
	className?: string
}
