import { DayMonthYear } from './checkStringDateOnErrors'
import FORMAT_KEYS from '../constants/formatKeys'
import { isNull, isNotEqual, isFalse } from 'helpers'
import { GetMinMaxType, getMinMax } from '../constants/dates_min_max'
import 'core-js/features/string/replace-all'

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

const valueOnMinMaxDiapason = (
	value: number,
	options: { min: number; max: number }
) => {
	return value >= options.min && value <= options.max
}

const getValueFromString = (value: string, valueType: GetMinMaxType) => {
	const numberedValue = Number(value)
	if (isNaN(numberedValue)) return null

	const minMaxValue = getMinMax(valueType)
	if (isNull(minMaxValue)) return null

	if (isFalse(valueOnMinMaxDiapason(numberedValue, minMaxValue))) {
		return null
	}

	return numberedValue
}

const getFormatDividers = (format: string): string[] | null => {
	const dividers = replaceAllInStringFromArray(
		format,
		FORMAT_KEYS,
		__DATE_DIVIDER__
	)

	// TODO: Create "isEmptyString" func
	if (!dividers) return null

	const splittedDividers = dividers.split(__DATE_DIVIDER__)
	const filrteredDividers = splittedDividers.filter(element =>
		isNotEqual(element, '')
	)

	// TODO: Create 'getSettedArray' func
	return Array.from(new Set(filrteredDividers))
}

const getDayMonthYear = (stringDate: string, formatDividers: string[]) => {
	const dayMonthYear = replaceAllInStringFromArray(
		stringDate,
		formatDividers,
		__DATE_DIVIDER__
	)

	// TODO: Create "isEmptyString" func
	if (!dayMonthYear) return null

	const splittedDayMonthYear = dayMonthYear
		.split(__DATE_DIVIDER__)
		.filter(element => element !== '')

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
