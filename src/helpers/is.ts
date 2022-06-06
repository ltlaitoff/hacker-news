import { isNotNumber } from './isNot'

/* equals */
export const isEqual = (first: unknown, second: unknown): boolean => {
	return first === second
}

export const isNoStrictEqual = (first: unknown, second: unknown): boolean => {
	return first == second
}

/* is type */
export const isTrue = (element: unknown): boolean => {
	return isEqual(Boolean(element), true)
}

export const isFalse = (element: unknown): boolean => {
	return isEqual(Boolean(element), false)
}

export const isStrictTrue = (element: unknown): boolean => {
	return isEqual(element, true)
}

export const isStrictFalse = (element: unknown): boolean => {
	return isEqual(element, false)
}

export const isNumber = (element: unknown): boolean => {
	return isEqual(typeof element, 'number')
}

export const isValidNumber = (element: unknown): boolean => {
	if (isNotNumber(element)) return false

	// FIXME: Remove ts-expect-error
	// @ts-expect-error: isNotNumber check on number.
	if (isNaN(element)) return false

	return true
}

export const isNull = (element: unknown): boolean => {
	return isEqual(element, null)
}

export const isNoStrictNull = (element: unknown): boolean => {
	return isNoStrictEqual(element, null)
}
