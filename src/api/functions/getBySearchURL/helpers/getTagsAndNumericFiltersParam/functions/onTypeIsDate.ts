import { NumericFilters } from 'api/api.interfaces'
import { SECONDS_IN_DAY } from 'data/constants'
import { FilterDateReceived } from 'typescript'

const API_DAY = NumericFilters.DATE

const onTypeIsDate = (filter: FilterDateReceived) => {
	if (filter.filtration === 'is within') {
		const firstDaySec = filter.value[0].getTime() / 1000
		const secondDaySec = filter.value[1].getTime() / 1000

		return `${API_DAY}<${firstDaySec},${API_DAY}>${secondDaySec}`
	}

	const dayStartSec = filter.value.getTime() / 1000
	const dayEndSec = dayStartSec + SECONDS_IN_DAY

	switch (filter.filtration) {
		case 'is': {
			return `${API_DAY}>${dayStartSec},${API_DAY}<${dayEndSec}`
		}

		case 'is before': {
			return `${API_DAY}<${dayStartSec}`
		}

		case 'is after': {
			return `${API_DAY}>${dayEndSec}`
		}

		case 'is on or before': {
			return `${API_DAY}<${dayEndSec}`
		}

		case 'is on or after': {
			return `${API_DAY}>${dayStartSec}`
		}
	}

	throw new Error(`Invalid filter.filtration on filter = ${filter}`)
}

export { onTypeIsDate }
