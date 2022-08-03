import { FilterStringReceived } from 'typescript/filters'

type onTypeIsStringOptions = {
	key?: string
}

const onTypeIsString = (
	filter: FilterStringReceived,
	options: onTypeIsStringOptions
): string => {
	if (options.key) {
		return `${options.key}_${filter.value}`
	}

	return filter.value
}

export { onTypeIsString }
