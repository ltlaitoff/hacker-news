import { isEqual, isNoStrictEqual, isFalse, isTrue } from './is'

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
