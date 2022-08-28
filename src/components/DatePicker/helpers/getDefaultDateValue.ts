import { isNull } from 'helpers'
import {
	DatePickerRangeValueWithNull,
	DatePickerStandartValueWithNull
} from '../DatePicker.interfaces'

export const getDefaultDateValue = (
	value: DatePickerStandartValueWithNull | DatePickerRangeValueWithNull
): [Date, Date] => {
	const currentDate = new Date(Date.now())

	if (isNull(value)) {
		return [currentDate, currentDate]
	}

	if (value instanceof Array) {
		if (isNull(value[0]) || isNull(value[1])) {
			return [currentDate, currentDate]
		}

		return value
	}

	return [value, value]
}
