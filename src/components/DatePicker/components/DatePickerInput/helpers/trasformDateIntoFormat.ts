import { isValidDate } from 'helpers'

import 'core-js/features/string/replace-all'

type getFormattedDateOptions = {
	Y: number | string
	M: number | string
	MM: number | string
	d: number | string
	dd: number | string
}

export const getZeroPadded = (value: number | string): string => {
	const stringifyValue = String(value)

	return stringifyValue.length === 1 ? '0' + stringifyValue : stringifyValue
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

export const trasformDateIntoFormat = (
	dateValue: Date,
	format: string
): string | null => {
	if (isValidDate(dateValue) === false) {
		return null
	}

	const formatterOptions: getFormattedDateOptions = {
		Y: dateValue.getFullYear(),
		M: dateValue.getMonth() + 1,
		MM: getZeroPadded(dateValue.getMonth() + 1),
		d: dateValue.getDate(),
		dd: getZeroPadded(dateValue.getDate())
	}

	return getFormattedDate(format, formatterOptions)
}
