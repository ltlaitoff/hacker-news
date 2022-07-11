function getIdsFromArray<T extends { id: number }>(current: T[]): number[] {
	return current.map(element => element.id)
}

function getDifferenceFirstAndSecondArraysWithIdField<
	T extends { id: number },
	U extends { id: number }
>(first: T[], second: U[]): T[] {
	const secondIds = getIdsFromArray(second)

	return first.filter(filter => !secondIds.includes(filter.id))
}

export { getDifferenceFirstAndSecondArraysWithIdField }
