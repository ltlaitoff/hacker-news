import {
	isEqual,
	isNoStrictEqual,
	isFalse,
	isTrue,
	isNumber,
	isStrictTrue,
	isStrictFalse,
	isNull,
	isNoStrictNull
} from './is'

/* equals */
export function isNotEqual<T>(a: unknown, b: T): a is T {
	return !isEqual(a, b)
}

export function isNotNoStrictEqual<T>(a: unknown, b: T): a is T {
	return !isNoStrictEqual(a, b)
}

/* is type */
export function isNotFalse(element: boolean): boolean {
	return !isFalse(element)
}

export function isNotTrue(element: boolean): boolean {
	return !isTrue(element)
}

export function isStrictNotTrue<T extends boolean>(
	element: T
): element is Exclude<T, true> {
	return !isStrictTrue(element)
}

export function isStrictNotFalse<T extends boolean>(
	element: T
): element is Exclude<T, false> {
	return !isStrictFalse(element)
}

export function isNotNumber<T extends unknown>(
	element: T
): element is Exclude<T, number> {
	return !isNumber(element)
}

export function isNotNull<T extends unknown>(
	element: T
): element is Exclude<T, null> {
	return !isNull(element)
}

export function isNotNoStrictNull<T extends unknown>(
	element: T
): element is Exclude<Exclude<T, null>, undefined> {
	return !isNoStrictNull(element)
}
