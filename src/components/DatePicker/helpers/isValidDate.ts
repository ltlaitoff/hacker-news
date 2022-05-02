export const isValidDate = (value: unknown) => {
	if (!(value instanceof Date)) return false

	if (value.toString() === 'Invalid Date') {
		return false
	}

	return true
}
