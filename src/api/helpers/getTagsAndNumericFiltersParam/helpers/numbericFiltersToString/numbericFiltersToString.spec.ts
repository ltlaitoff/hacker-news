import { NumericFilters } from '../../../../api.interfaces'
import { numbericFiltersToString } from './numbericFiltersToString'

const COMMENTS = 'COMMENTS'
const POINTS = 'POINTS'
const DATE = 'DATE'

jest.mock('../../../../api.interfaces', () => ({
	NumericFilters: {
		DATE: DATE,
		POINTS: POINTS,
		COMMENTS: COMMENTS
	}
}))

describe('api/helpers/getTagsAndNumericFiltersParam/helpers/numbericFiltersToString', () => {
	it.each`
		comments           | points           | date           | result
		${''}              | ${''}            | ${''}          | ${''}
		${'test_comments'} | ${''}            | ${''}          | ${'test_comments'}
		${''}              | ${'test_points'} | ${''}          | ${'test_points'}
		${''}              | ${''}            | ${'test_date'} | ${'test_date'}
		${'test_comments'} | ${'test_points'} | ${''}          | ${'test_comments,test_points'}
		${''}              | ${'test_points'} | ${'test_date'} | ${'test_points,test_date'}
		${'test_comments'} | ${''}            | ${'test_date'} | ${'test_comments,test_date'}
		${'test_comments'} | ${'test_points'} | ${'test_date'} | ${'test_comments,test_points,test_date'}
	`(
		`numbericFiltersToString with prop = {${COMMENTS}: $comments, ${POINTS}: $points, ${DATE}: $date} should return $result`,
		({ comments, points, date, result }) => {
			const functionResult = numbericFiltersToString({
				[NumericFilters.COMMENTS]: comments,
				[NumericFilters.POINTS]: points,
				[NumericFilters.DATE]: date
			})

			expect(functionResult).toBe(result)
		}
	)
})
