import {
	Filter,
	DateStandartFiltrations,
	DateSpecicalFiltrations
} from './filters.interfaces'

const getDateStandartFiltrationFunc = (type: keyof DateStandartFiltrations) => {
	return (fieldName: string, value: string) => {
		switch (type) {
			case 'is':
				return `${fieldName}=${value}`
			case 'is before':
				return `${fieldName}<${value}`

			case 'is after':
				return `${value}<${fieldName}`

			case 'is on or before':
				return `${fieldName}<=${value}`

			case 'is on or after':
				return `${value}<=${fieldName}`
		}
	}

	throw new Error('getDateStandartFiltrationFunc error with type ' + type)
}

const getDateSpecicalFiltrationFunc = (type: keyof DateSpecicalFiltrations) => {
	switch (type) {
		case 'is within':
			return (fieldName: string, firstValue: string, secondValue: string) =>
				`${fieldName}<${firstValue}&${fieldName}>${secondValue}`
	}

	throw new Error('getDateSpecicalFiltrationFunc error with type ' + type)
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
			'is within': getDateSpecicalFiltrationFunc('is within')
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
			'is within': getDateSpecicalFiltrationFunc('is within')
		}
	}
]
