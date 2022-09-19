import { MinMaxLimitsType } from './minMaxLimits.interfaces'

const MIN_MAX_LIMITS: MinMaxLimitsType = {
	day: {
		min: 1,
		max: 31
	},
	month: {
		min: 1,
		max: 12
	},
	year: {
		min: 1900,
		max: 2100
	}
}

export default MIN_MAX_LIMITS
