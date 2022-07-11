import {
	checkDateInDateArray,
	checkDifferenceExistsInTwoDateArrays
} from './checkDates'

describe('compare Filter helpers', () => {
	describe('checkDateInDateArray', () => {
		it.each`
			date                      | dateArray                                           | result
			${new Date('01-01-2022')} | ${[new Date('01-01-2022'), new Date('01-01-2021')]} | ${true}
			${new Date('01-01-2022')} | ${[new Date('01-01-2022')]}                         | ${true}
			${new Date('01-01-2022')} | ${[new Date('01-01-2021')]}                         | ${false}
		`(
			'checkDateInDateArray with date = $date and dateArray = $dateArray should return $result',
			({ date, dateArray, result }) => {
				expect(checkDateInDateArray(date, dateArray)).toBe(result)
			}
		)
	})

	describe('checkDifferenceExistsInTwoDateArrays', () => {
		it.each`
			firstArray                                          | secondArray                                         | result
			${[new Date('01-01-2022'), new Date('01-01-2021')]} | ${[new Date('01-01-2022'), new Date('01-01-2021')]} | ${false}
			${[new Date('01-01-2022'), new Date('01-01-2022')]} | ${[new Date('01-01-2022'), new Date('01-03-2022')]} | ${true}
			${[new Date('01-02-2021'), new Date('01-02-2021')]} | ${[new Date('01-01-2022'), new Date('01-02-2021')]} | ${true}
			${[new Date('01-01-2022'), new Date('01-01-2021')]} | ${[new Date('01-01-2022')]}                         | ${true}
			${[]}                                               | ${[new Date('01-01-2022'), new Date('01-01-2021')]} | ${true}
			${[new Date('01-01-2022'), new Date('01-01-2021')]} | ${[]}                                               | ${true}
			${[]}                                               | ${[]}                                               | ${false}
		`(
			'checkDifferenceExistsInTwoDateArrays with firstArray = $firstArray and secondArray = $secondArray should return $result',
			({ firstArray, secondArray, result }) => {
				expect(
					checkDifferenceExistsInTwoDateArrays(firstArray, secondArray)
				).toBe(result)
			}
		)
	})
})
