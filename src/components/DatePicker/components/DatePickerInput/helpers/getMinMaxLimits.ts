import { DateMinMax, GetMinMaxType, MIN_MAX_LIMITS } from '../constants'

export const getMinMaxLimits = (type: GetMinMaxType): DateMinMax | null => {
	switch (type) {
		case GetMinMaxType.DAY:
			return MIN_MAX_LIMITS.day
		case GetMinMaxType.MONTH:
			return MIN_MAX_LIMITS.month
		case GetMinMaxType.YEAR:
			return MIN_MAX_LIMITS.year
	}

	return null
}
