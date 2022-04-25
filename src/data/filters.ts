import { CONDITIONS } from './conditions'

type AvailableFiltrations = [
	'is',
	'is before',
	'is after',
	'is on or before',
	'is on or after',
	'is within'
]

export interface Filter {
	id: number
	//eslint-disable-next-line
	name: string
	availableFiltrations: Partial<AvailableFiltrations>
}

export const FILTERS: Filter[] = [
	{
		id: 0,
		name: 'Test',
		availableFiltrations: ['is', 'is before', 'is after']
	},
	{
		id: 0,
		name: 'Data',
		availableFiltrations: [
			'is',
			'is before',
			'is after',
			'is on or before',
			'is on or after',
			'is within'
		]
	}
]

export const filtersConditions: Record<string, string | null | Array<string>> =
	{
		is: CONDITIONS.equal,
		'is before': CONDITIONS.less,
		'is after': CONDITIONS.greated,
		'is on or before': CONDITIONS.lessOrEqual,
		'is on or after': CONDITIONS.greaterOrEqual,
		'is within': [CONDITIONS.greated, CONDITIONS.less]
	}
