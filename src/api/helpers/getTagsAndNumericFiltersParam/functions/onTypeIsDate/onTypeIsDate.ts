import { NumericFilters } from 'api/api.interfaces'
import { SECONDS_IN_DAY } from 'data/constants'
import { getDateSeconds } from 'helpers'
import { FilterDateReceived } from 'typescript'

const API_DAY = NumericFilters.DATE

const onTypeIsDate = (filter: FilterDateReceived) => {
	if (filter.filtration === 'is within') {
		const firstDaySec = getDateSeconds(filter.value[0])
		const secondDaySec = getDateSeconds(filter.value[1])

		return `${API_DAY}>${firstDaySec},${API_DAY}<${secondDaySec}`
	}

	const dayStartSec = getDateSeconds(filter.value)
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

	throw new Error(
		// @ts-expect-error
		`Invalid filter.filtration = ${filter.filtration} in onTypeIsDate`
	)
}

export { onTypeIsDate }
