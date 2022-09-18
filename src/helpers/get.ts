export function getFilledArray<T>(length: number, value: T): T[] {
	if (length < 0) return []
	return Array(length).fill(value)
}

export function getOrderedNumbers(
	first: number,
	second: number
): [number, number] {
	if (first < second) {
		return [first, second]
	}

	return [second, first]
}
