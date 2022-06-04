import { isEqual, isNoStrictEqual } from './is'

export const isNotEqual = (first: unknown, second: unknown) => {
	return !isEqual(first, second)
}

export const isNotNoStrictEqual = (first: unknown, second: unknown) => {
	return !isNoStrictEqual(first, second)
}
