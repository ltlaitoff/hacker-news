export function getFilledArray<T>(length: number, value: T): T[] {
	if (length < 0) return []
	return Array(length).fill(value)
}
