import {
	isEqual,
	isNoStrictEqual,
	isFalse,
	isTrue,
	isNumber,
	isValidNumber,
	isStrictTrue,
	isStrictFalse,
	isNull,
	isNoStrictNull
} from './is'

/* equals */
export const isNotEqual = (first: unknown, second: unknown) => {
	return !isEqual(first, second)
}

export const isNotNoStrictEqual = (first: unknown, second: unknown) => {
	return !isNoStrictEqual(first, second)
}

/* is type */
export const isNotFalse = (element: boolean): boolean => {
	return !isFalse(element)
}

export const isNotTrue = (element: boolean): boolean => {
	return !isTrue(element)
}

export const isStrictNotTrue = (element: boolean): boolean => {
	return !isStrictTrue(element)
}

export const isStrictNotFalse = (element: boolean): boolean => {
	return !isStrictFalse(element)
}

export const isNotNumber = (element: unknown): boolean => {
	return !isNumber(element)
}

export const isNotValidNumber = (element: unknown): boolean => {
	return !isValidNumber(element)
}

export const isNotNull = (element: unknown): boolean => {
	return !isNull(element)
}

export const isNotNoStrictNull = (element: unknown): boolean => {
	return !isNoStrictNull(element)
}
