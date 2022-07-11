import {
	someElementIsNaN,
	someArrayElementIsNaN,
	someElementIsNoNumber,
	someArrayElementIsNoNumber,
	someElementIsFalse,
	someArrayElementIsFalse,
	someElementIsStrictFalse,
	someArrayElementIsStrictFalse,
	someElementIsNull,
	someArrayElementIsNull,
	someElementIsNoStrictNull,
	someArrayElementIsNoStrictNull
} from './someElementIs'

export const someElementIsNotNaN = (...numbers: number[]): boolean => {
	return !someElementIsNaN(...numbers)
}

export const someArrayElementIsNotNaN = (numbers: number[]): boolean => {
	return !someArrayElementIsNaN(numbers)
}

export const someElementIsNotNoNumber = (...numbers: unknown[]): boolean => {
	return !someElementIsNoNumber(...numbers)
}

export const someArrayElementIsNotNoNumber = (numbers: unknown[]): boolean => {
	return !someArrayElementIsNoNumber(numbers)
}

export const someElementIsNotFalse = (...booleans: boolean[]): boolean => {
	return !someElementIsFalse(...booleans)
}

export const someArrayElementIsNotFalse = (booleans: unknown[]): boolean => {
	return !someArrayElementIsFalse(booleans)
}

export const someElementIsStrictNotFalse = (
	...booleans: unknown[]
): boolean => {
	return !someElementIsStrictFalse(...booleans)
}

export const someArrayElementIsStrictNotFalse = (
	booleans: unknown[]
): boolean => {
	return !someArrayElementIsStrictFalse(booleans)
}

export const someElementIsNotNull = (...numbers: unknown[]): boolean => {
	return !someElementIsNull(...numbers)
}

export const someArrayElementIsNotNull = (numbers: unknown[]): boolean => {
	return !someArrayElementIsNull(numbers)
}

export const someElementIsNotNoStrictNull = (
	...numbers: unknown[]
): boolean => {
	return !someElementIsNoStrictNull(...numbers)
}

export const someArrayElementIsNotNoStrictNull = (
	numbers: unknown[]
): boolean => {
	return !someArrayElementIsNoStrictNull(numbers)
}
