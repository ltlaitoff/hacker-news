import {
	someElementIsNaN,
	someArrayElementIsNaN,
	someElementIsNoNumber,
	someArrayElementIsNoNumber,
	someElementIsFalse,
	someArrayElementIsFalse,
	someElementIsStrictFalse,
	someArrayElementIsStrictFalse
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
