import { DayMonthYear } from './checkStringDateOnErrors'

import {
	isNull,
	isNotEqual,
	isFalse,
	isEmptyString,
	getUniqueArray
} from 'helpers'
import { FORMAT_KEYS, GetMinMaxType, getMinMax } from '../constants'
import 'core-js/features/string/replace-all'
import { checkOnMinMaxIncludes } from 'helpers'

const __DATE_DIVIDER__ = '__NOT_USE_IT_IN_DATE__'

const replaceAllInStringFromArray = (
	string: string,
	replacingValues: string[],
	toReplace: string
): string => {
	return replacingValues.reduce(
		(prevent, current) => prevent.replaceAll(current, toReplace),
		string
	)
}

const getValueFromString = (value: string, valueType: GetMinMaxType) => {
	const numberedValue = Number(value)
	if (isNaN(numberedValue)) return null

	const minMaxValue = getMinMax(valueType)
	if (isNull(minMaxValue)) return null

	if (isFalse(checkOnMinMaxIncludes(numberedValue, minMaxValue))) {
		return null
	}

	return numberedValue
}

const getFormatDividers = (format: string): string[] | null => {
	// TODO: Move it in function
	const dividers = replaceAllInStringFromArray(
		format,
		FORMAT_KEYS,
		__DATE_DIVIDER__
	)

	if (isEmptyString(dividers)) return null

	// TODO: Move it in function
	const splittedDividers = dividers
		.split(__DATE_DIVIDER__)
		.filter(element => isNotEqual(element, ''))

	return getUniqueArray(splittedDividers)
}

const getDayMonthYear = (stringDate: string, formatDividers: string[]) => {
	// TODO: Move it in function
	const dayMonthYear = replaceAllInStringFromArray(
		stringDate,
		formatDividers,
		__DATE_DIVIDER__
	)

	if (isEmptyString(dayMonthYear)) return null

	// TODO: Move it in function
	const splittedDayMonthYear = dayMonthYear
		.split(__DATE_DIVIDER__)
		.filter(element => isNotEqual(element, ''))

	const [day, month, year] = splittedDayMonthYear

	return {
		day,
		month,
		year
	}
}

const transformDayMonthYearToNumbers = (
	data: DayMonthYear<string>
): DayMonthYear<number> | null => {
	const day = getValueFromString(data.day, GetMinMaxType.DAY)
	const month = getValueFromString(data.month, GetMinMaxType.MONTH)
	const year = getValueFromString(data.year, GetMinMaxType.YEAR)

	// TODO: Change it to "someElementIs"
	if (isNull(day) || isNull(month) || isNull(year)) {
		return null
	}

	return {
		day,
		month,
		year
	}
}

const getDayMonthYearFromStringByFormat = (
	stringDate: string,
	format: string
): DayMonthYear<number> | null => {
	const formatDividers = getFormatDividers(format)

	if (isNull(formatDividers)) return null

	const dayMonthYear: DayMonthYear<string> | null = getDayMonthYear(
		stringDate,
		formatDividers
	)

	if (isNull(dayMonthYear)) return null

	return transformDayMonthYearToNumbers(dayMonthYear)
}

export default getDayMonthYearFromStringByFormat
