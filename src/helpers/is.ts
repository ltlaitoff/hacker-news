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
