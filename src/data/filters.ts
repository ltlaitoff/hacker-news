import {
	Filter,
	DateStandartFiltrations,
	DateSpecicalFiltrations,
	DateStandartFiltrationsFunction,
	DateSpecicalFiltrationsFunction
} from './filters.interfaces'

export const getDateStandartFiltrationFunc = (
	type: keyof DateStandartFiltrations
): DateStandartFiltrationsFunction => {
	return (fieldName: string, value: string) => {
		switch (type) {
			case 'is':
				return `${fieldName}=${value}`
			case 'is before':
				return `${fieldName}<${value}`

			case 'is after':
				return `${fieldName}>${value}`

			case 'is on or before':
				return `${fieldName}<=${value}`

			case 'is on or after':
				return `${fieldName}>=${value}`
		}
	}
}

export const getDateSpecicalFiltrationFunc = (
	type: keyof DateSpecicalFiltrations
): DateSpecicalFiltrationsFunction => {
	switch (type) {
		case 'is within':
			return (fieldName: string, firstValue: string, secondValue: string) =>
				`${fieldName}<${firstValue},${fieldName}>${secondValue}`
	}
}

export const filters: Filter[] = [
	{
		id: 0,
		label: 'test',
		type: 'date',
		standartFiltrations: {
			is: getDateStandartFiltrationFunc('is'),
			'is before': getDateStandartFiltrationFunc('is before'),
			'is after': getDateStandartFiltrationFunc('is after')
		},

		specicalFiltrations: {
			'is within': {
				type: 'two',
				getResult: getDateSpecicalFiltrationFunc('is within')
			}
		}
	},
	{
		id: 1,
		label: 'Date',
		type: 'date',
		standartFiltrations: {
			is: getDateStandartFiltrationFunc('is'),
			'is before': getDateStandartFiltrationFunc('is before'),
			'is after': getDateStandartFiltrationFunc('is after'),
			'is on or before': getDateStandartFiltrationFunc('is on or before'),
			'is on or after': getDateStandartFiltrationFunc('is on or after')
		},

		specicalFiltrations: {
			'is within': {
				type: 'two',
				getResult: getDateSpecicalFiltrationFunc('is within')
			}
		}
	}
]
