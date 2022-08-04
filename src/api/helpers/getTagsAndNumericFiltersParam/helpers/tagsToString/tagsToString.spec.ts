import { APIParameters } from '../../../../api.interfaces'
import { tagsToString } from './tagsToString'

const AUTHOR = 'author'
const TAGS = 'tags'

jest.mock('../../../../api.interfaces', () => ({
	APIParameters: {
		AUTHOR: AUTHOR,
		TAGS: TAGS
	}
}))

describe('api/helpers/getTagsAndNumericFiltersParam/helpers/tagsToString', () => {
	it.each`
		author           | tags           | result
		${''}            | ${''}          | ${''}
		${'test_author'} | ${''}          | ${'test_author'}
		${''}            | ${'test_tags'} | ${'test_tags'}
		${'test_author'} | ${'test_tags'} | ${'test_author,test_tags'}
	`(
		`tagsToString with value = {${AUTHOR}: $author, ${TAGS}: $tags} should return $result`,
		({ author, tags, result }) => {
			const functionResult = tagsToString({
				[APIParameters.AUTHOR]: author,
				[APIParameters.TAGS]: tags
			})

			expect(functionResult).toBe(result)
		}
	)
})
