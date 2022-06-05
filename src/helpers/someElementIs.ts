import { isFalse, isStrictFalse } from './is'
import { isNotValidNumber } from './isNot'

export const someElementIsNaN = (...numbers: number[]): boolean => {
	return numbers.some(element => isNaN(element))
}

export const someArrayElementIsNaN = (numbers: number[]): boolean => {
	return someElementIsNaN(...numbers)
}

export const someElementIsNoNumber = (...numbers: unknown[]): boolean => {
	return numbers.some(element => isNotValidNumber(element))
}

export const someArrayElementIsNoNumber = (numbers: unknown[]): boolean => {
	return someElementIsNoNumber(...numbers)
}

export const someElementIsFalse = (...booleans: unknown[]): boolean => {
	return booleans.some(element => isFalse(element))
}

export const someArrayElementIsFalse = (booleans: unknown[]): boolean => {
	return someElementIsFalse(...booleans)
}

export const someElementIsStrictFalse = (...booleans: unknown[]): boolean => {
	return booleans.some(element => isStrictFalse(element))
}

export const someArrayElementIsStrictFalse = (booleans: unknown[]): boolean => {
	return someElementIsStrictFalse(...booleans)
}
