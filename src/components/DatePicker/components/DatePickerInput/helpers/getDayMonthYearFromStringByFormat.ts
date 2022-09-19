import 'core-js/features/string/replace-all'

import {
	isNull,
	isNotEqual,
	isFalse,
	isEmptyString,
	getUniqueArray,
	checkOnMinMaxIncludes
} from 'helpers'

import { DayMonthYear } from './checkStringDateOnErrors'
import { getMinMaxLimits } from './getMinMaxLimits'
import { FORMAT_KEYS, GetMinMaxType } from '../constants'

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

const changeKeysToDateDivider = (string: string, replacingValues: string[]) => {
	return replaceAllInStringFromArray(string, replacingValues, __DATE_DIVIDER__)
}

const getValuesFromDateDividersString = (string: string) => {
	return string
		.split(__DATE_DIVIDER__)
		.filter(element => isNotEqual(element, ''))
}

const getValueFromString = (value: string, valueType: GetMinMaxType) => {
	const numberedValue = Number(value)
	if (isNaN(numberedValue)) return null

	const minMaxValue = getMinMaxLimits(valueType)
	if (isNull(minMaxValue)) return null

	if (isFalse(checkOnMinMaxIncludes(numberedValue, minMaxValue))) {
		return null
	}

	return numberedValue
}

const getFormatDividers = (format: string): string[] | null => {
	const dividers = changeKeysToDateDivider(format, FORMAT_KEYS)

	if (isEmptyString(dividers)) return null

	return getUniqueArray(getValuesFromDateDividersString(dividers))
}

const getDayMonthYear = (stringDate: string, formatDividers: string[]) => {
	const dayMonthYear = changeKeysToDateDivider(stringDate, formatDividers)

	if (isEmptyString(dayMonthYear)) return null

	const [day, month, year] = getValuesFromDateDividersString(dayMonthYear)

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
