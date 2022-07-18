import { NumericFilters } from 'api/api.interfaces'
import { FilterNumberReceived } from 'typescript'

const COMMENTS_API = NumericFilters.COMMENTS

const onTypeIsNumber = (filter: FilterNumberReceived) => {
	if (filter.filtration === 'is between') {
		const [first, second] = filter.value

		return `${COMMENTS_API}>${first},${COMMENTS_API}<${second}`
	}

	const value = filter.value

	switch (filter.filtration) {
		case 'is': {
			return `${COMMENTS_API}=${value}`
		}

		case 'is bigger': {
			return `${COMMENTS_API}>${value}`
		}

		case 'is lower': {
			return `${COMMENTS_API}<${value}`
		}

		case 'is on or bigger': {
			return `${COMMENTS_API}>=${value}`
		}

		case 'is on or lower': {
			return `${COMMENTS_API}<=${value}`
		}
	}

	throw new Error(`Invalid filter.filtration on filter = ${filter}`)
}

export { onTypeIsNumber }
