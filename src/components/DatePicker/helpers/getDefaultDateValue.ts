import { isNull } from 'helpers'
import { DatePickerTwoDates } from '../DatePicker.interfaces'

export const getDefaultDateValue = (
	value: Date | DatePickerTwoDates | null
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
