import { datesEqual } from 'helpers'

function checkElementInArrayWithCompareFunction<T>(
	element: T,
	array: T[],
	compareFunction: (first: T, second: T) => boolean
): boolean {
	const filteredArray = array.filter(currentElement =>
		compareFunction(currentElement, element)
	)

	return filteredArray.length !== 0
}

const checkDateInDateArray = (date: Date, dateArray: Array<Date>): boolean => {
	return checkElementInArrayWithCompareFunction(date, dateArray, datesEqual)
	// const filteredArray = dateArray.filter(currentDate =>
	// datesCompare(currentDate, date)
	// )
	//
	// return filteredArray.length !== 0
}

const checkDifferenceExistsInTwoDateArrays = (
	firstDateArray: Array<Date>,
	secondDateArray: Array<Date>
) => {
	/*
		Return false if current first array element is not includes in second array
	*/

	const firstLength = firstDateArray.length
	const secondLength = secondDateArray.length

	if (firstLength === 0 && secondLength === 0) return false
	if (firstLength === 0 || secondLength === 0) return true

	const firstDateValueOfArray = firstDateArray.map(element => element.valueOf())
	const secondDateValueOfArray = secondDateArray.map(element =>
		element.valueOf()
	)

	for (let i = 0; i < firstDateArray.length; i++) {
		const firstElement = firstDateValueOfArray[i]
		const secondElement = secondDateValueOfArray[i]

		if (!firstDateValueOfArray.includes(secondElement)) return true
		if (!secondDateValueOfArray.includes(firstElement)) return true
	}

	return false
}

export { checkDateInDateArray, checkDifferenceExistsInTwoDateArrays }
