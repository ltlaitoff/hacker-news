import { FilterBaseType, FilterReceived } from 'typescript'

export const getFilterFiltrationType = (filter: FilterReceived) => {
	switch (filter.type) {
		case FilterBaseType.DATE: {
			if (filter.filtration === 'is within') {
				return 'two'
			}

			return 'one'
		}
		case FilterBaseType.NUMBER: {
			if (filter.filtration === 'is between') {
				return 'two'
			}

			return 'one'
		}
		case FilterBaseType.LIST: {
			return 'one'
		}
	}
}

export const getFiltrationTypeByFiltration = (
	filtration: FilterReceived['filtration']
) => {
	if (filtration === 'is within' || filtration === 'is between') {
		return 'two'
	}

	return 'one'
}
