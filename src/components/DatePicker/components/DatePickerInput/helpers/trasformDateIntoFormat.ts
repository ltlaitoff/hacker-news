import { isValidDate } from 'helpers'

import 'core-js/features/string/replace-all'

type getFormattedDateOptions = {
	Y: number | string
	M: number | string
	MM: string
	d: number | string
	dd: string
}

const getFormattedDateEntriesSort = (
	prev: [string, string | number],
	next: [string, string | number]
): number => {
	const equal = prev[0].length === next[0].length
	const prevLessNext = prev[0].length < next[0].length

	return equal ? 0 : prevLessNext ? 1 : -1
}

const getFormattedDate = (
	format: string,
	options: getFormattedDateOptions
): string => {
	const sortedOptions = Object.entries(options).sort(
		getFormattedDateEntriesSort
	)

	return sortedOptions.reduce(
		(prev, [key, value]) => prev.replaceAll(key, String(value)),
		format
	)
}

export const getZeroPadded = (value: number): string => {
	const stringifyValue = String(value)

	if (stringifyValue.length !== 1) return stringifyValue

	return '0' + stringifyValue
}

export const trasformDateIntoFormat = (
	dateValue: Date,
	format: string
): string | null => {
	if (isValidDate(dateValue) === false) {
		return null
	}

	const formatterOptions: getFormattedDateOptions = {
		// TODO: Change date.get to helpers/date
		Y: dateValue.getFullYear(),
		M: dateValue.getMonth() + 1,
		MM: getZeroPadded(dateValue.getMonth() + 1),
		d: dateValue.getDate(),
		dd: getZeroPadded(dateValue.getDate())
	}

	return getFormattedDate(format, formatterOptions)
}
