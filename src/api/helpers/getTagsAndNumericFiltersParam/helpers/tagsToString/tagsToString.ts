import { TagsToStringProp } from './tagsToString.interfaces'

export const tagsToString = (value: TagsToStringProp) => {
	const resultArray = Object.values(value).filter(value => value !== '')

	return resultArray.join(',')
}
