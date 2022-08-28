import {
	isNull,
	isNotValidDate,
	isNotEqual,
	getDateDay,
	getDatePeopleMonth,
	getDateFullYear
} from 'helpers'

import getDayMonthYearFromStringByFormat from './getDayMonthYearFromStringByFormat'

export interface DayMonthYear<T> {
	day: T
	month: T
	year: T
}

export const createDateByDayMonthYear = (
	data: DayMonthYear<number>
): Date | null => {
	const date = new Date(`${data.month}-${data.day}-${data.year}`)

	if (isNull(checkDateOnErrors(date, data))) {
		return null
	}

	return date
}

export const checkDateOnErrors = (date: Date, data: DayMonthYear<number>) => {
	if (isNotValidDate(date)) return null

	if (isNotEqual(data.day, getDateDay(date))) return null
	if (isNotEqual(data.month, getDatePeopleMonth(date))) return null
	if (isNotEqual(data.year, getDateFullYear(date))) return null

	return date
}

export const checkStringDateOnErrors = (
	stringDate: string,
	format: string
): null | Date => {
	const numbersData: DayMonthYear<number> | null =
		getDayMonthYearFromStringByFormat(stringDate, format)

	if (isNull(numbersData)) return null

	const date: Date | null = createDateByDayMonthYear(numbersData)

	if (isNull(date)) return null

	return date
}
