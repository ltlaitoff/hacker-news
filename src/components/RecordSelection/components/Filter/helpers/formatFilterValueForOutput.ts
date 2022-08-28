import { FilterReceived } from 'typescript/filters'
import { FILTER_DATE_FORMAT } from '../constants'

// XXX: WTF
import { trasformDateIntoFormat } from 'components/DatePicker/components/DatePickerInput/helpers'

function checkOnDateArray(value: [unknown, unknown]): value is [Date, Date] {
	return value[0] instanceof Date && value[1] instanceof Date
}

export const formatFilterValueForOutput = (value: FilterReceived['value']) => {
	if (value instanceof Array) {
		if (checkOnDateArray(value)) {
			return `${trasformDateIntoFormat(
				value[0],
				FILTER_DATE_FORMAT
			)} and ${trasformDateIntoFormat(value[1], FILTER_DATE_FORMAT)}`
		}

		return `${value[0]} and ${value[1]}`
	}

	if (value instanceof Date) {
		return trasformDateIntoFormat(value, FILTER_DATE_FORMAT)
	}

	return String(value)
}
