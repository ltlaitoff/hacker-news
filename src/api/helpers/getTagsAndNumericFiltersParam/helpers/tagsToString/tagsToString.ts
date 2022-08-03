import { APIParameters } from '../../../../api.interfaces'
import { TagsToStringProp } from './tagsToString.interfaces'

export const tagsToString = (value: TagsToStringProp) => {
	const resultArray = [
		value[APIParameters.AUTHOR],
		value[APIParameters.TAGS]
	].filter(value => value !== '')

	return resultArray.join(',')
}
