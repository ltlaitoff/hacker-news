/* equals */
export function isEqual<T>(a: unknown, b: T): a is T {
	return a === b
}

export function isNoStrictEqual<T>(a: unknown, b: T): a is T {
	// eslint-disable-next-line eqeqeq
	return a == b
}

/* is type */
export function isTrue(element: unknown): boolean {
	return isEqual(Boolean(element), true)
}

export function isFalse(element: unknown): boolean {
	return isEqual(Boolean(element), false)
}

export function isStrictTrue(element: unknown): element is true {
	return isEqual(element, true)
}

export function isStrictFalse(element: unknown): element is false {
	return isEqual(element, false)
}

export function isNumber(element: unknown): element is number {
	return isEqual(typeof element, 'number')
}

export function isNull(element: unknown): element is null {
	return isEqual(element, null)
}

export function isNoStrictNull(element: unknown): element is null | undefined {
	return isNoStrictEqual(element, null)
}

// TODO: Write tests for isUndefined function
export function isUndefined(element: unknown): element is undefined {
	return isEqual(element, undefined)
}

// TODO: Write tests for isNoStrictUndefined function
export function isNoStrictUndefined(
	element: unknown
): element is null | undefined {
	return isNoStrictEqual(element, undefined)
}
