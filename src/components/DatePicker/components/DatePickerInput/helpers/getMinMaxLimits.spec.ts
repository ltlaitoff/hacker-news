import { getMinMaxLimits } from './getMinMaxLimits'

const MIN_MAX_KEYS = {
	DAY: 'day_mock',
	MONTH: 'month_mock',
	YEAR: 'year_mock'
}

const MIN_MAX_LIMITS = {
	day: {
		min: -1,
		max: 1
	},
	month: {
		min: -2,
		max: 2
	},
	year: {
		min: -3,
		max: 3
	}
}

jest.mock('../constants', () => ({
	GetMinMaxType: MIN_MAX_KEYS,
	MIN_MAX_LIMITS: MIN_MAX_LIMITS
}))

describe('DatePicker/DatePickerInput/getMixMaxLimits', () => {
	it.each`
		type                  | result
		${MIN_MAX_KEYS.DAY}   | ${MIN_MAX_LIMITS.day}
		${MIN_MAX_KEYS.MONTH} | ${MIN_MAX_LIMITS.month}
		${MIN_MAX_KEYS.YEAR}  | ${MIN_MAX_LIMITS.year}
		${'undefined'}        | ${null}
	`(
		'On type = "$type", getMinMaxLimits should return $result',
		({ type, result }) => {
			expect(getMinMaxLimits(type)).toEqual(result)
		}
	)
})
