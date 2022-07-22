interface Option<T extends string> {
	id: number
	label: T
}

type Options<T extends string> = Option<T>[]

export function transformArrayToOptions<T extends string>(
	arr: T[]
): Options<T> {
	return arr.map((value, index) => {
		return {
			id: index,
			label: value
		}
	})
}

export function transformNameObjectArrayToOptions<
	T extends { id: number; name: string }
>(arr: T[]): Options<T['name']> {
	return arr.map(element => {
		return {
			id: element.id,
			label: element.name
		}
	})
}
