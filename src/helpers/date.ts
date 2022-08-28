export const isValidDate = (value: unknown): boolean => {
	if (!(value instanceof Date)) return false

	return value.toString() !== 'Invalid Date'
}

export const isNotValidDate = (value: unknown): boolean => {
	return !isValidDate(value)
}

export const getDateDay = (date: Date): number | null => {
	if (isNotValidDate(date)) return null

	return date.getDate()
}

export const getDateMonth = (date: Date): number | null => {
	if (isNotValidDate(date)) return null

	return date.getMonth()
}

export const getDatePeopleMonth = (date: Date): number | null => {
	if (isNotValidDate(date)) return null

	return date.getMonth() + 1
}

export const getDateFullYear = (date: Date): number | null => {
	if (isNotValidDate(date)) return null

	return date.getFullYear()
}

export const getNowDateWithoutTime = (): Date => {
	const date = new Date(Date.now())
	date.setHours(0, 0, 0, 0)

	return date
}

export const getDateSeconds = (date: Date): number => {
	return Math.round(
		(date.getTime() - date.getTimezoneOffset() * 1000 * 60) / 1000
	)
}

// TODO: Write tests for datesEqual function
export const datesEqual = (first: Date, second: Date): boolean => {
	return first.valueOf() === second.valueOf()
}

// TODO: Write tests for datesNotEqual function
export const datesNotEqual = (first: Date, second: Date): boolean => {
	return !datesEqual(first, second)
}
