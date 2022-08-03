import { ON_TYPE_IS_LIST_DEFAULT } from '../../../../constants'
import { FilterListReceived } from 'typescript'

const onTypeIsList = (filter: FilterListReceived) => {
	if (filter.value === 'all') return ''

	switch (filter.filtration) {
		case 'is': {
			if (!filter.listValues.includes(filter.value)) {
				return ON_TYPE_IS_LIST_DEFAULT
			}

			return filter.value
		}

		case 'is except': {
			if (!filter.listValues.includes(filter.value)) {
				return ON_TYPE_IS_LIST_DEFAULT
			}

			const tagsArray = filter.listValues.filter(
				currentValue => currentValue !== filter.value && currentValue !== 'all'
			)

			if (tagsArray.length === 1) {
				return tagsArray[0]
			}

			return '(' + tagsArray.join(',') + ')'
		}
	}

	throw new Error(
		`Invalid filter.filtration = ${filter.filtration} in onTypeIsList`
	)
}

export { onTypeIsList }
