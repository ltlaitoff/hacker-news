import { FilterListReceived } from 'typescript'

const onTypeIsList = (filter: FilterListReceived) => {
	if (filter.value === 'all') return ''

	switch (filter.filtration) {
		case 'is': {
			return filter.value
		}

		case 'is except': {
			const tagsArray = filter.listValues.filter(
				currentValue => currentValue !== filter.value && currentValue !== 'all'
			)

			if (tagsArray.length === 1) {
				return tagsArray[0]
			}

			return '(' + tagsArray.join(',') + ')'
		}
	}

	throw new Error(`Invalid filter.filtration on filter = ${filter}`)
}

export { onTypeIsList }
