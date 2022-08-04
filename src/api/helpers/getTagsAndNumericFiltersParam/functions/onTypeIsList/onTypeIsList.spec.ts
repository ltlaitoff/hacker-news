import { FilterBaseName, FilterBaseType } from 'typescript/filters'
import { onTypeIsList } from './onTypeIsList'

const ON_TYPE_IS_LIST_DEFAULT = 'default'

jest.mock('../../../../constants', () => ({
	ON_TYPE_IS_LIST_DEFAULT
}))

describe('onTypeIsList', () => {
	it('On filter.value = "all" with filter.filtration = "is" onTypeIsList should return ""', () => {
		const result = onTypeIsList({
			id: 0,
			type: FilterBaseType.LIST,
			name: FilterBaseName.TAGS,
			listValues: [],
			filtration: 'is',
			value: 'all'
		})

		expect(result).toBe('')
	})

	it('On filter.value = "all" with filter.filtration = "is except" onTypeIsList should return ""', () => {
		const result = onTypeIsList({
			id: 0,
			type: FilterBaseType.LIST,
			name: FilterBaseName.TAGS,
			listValues: [],
			filtration: 'is except',
			value: 'all'
		})

		expect(result).toBe('')
	})

	it.each`
		value      | listValues                     | result
		${'test1'} | ${['test1', 'test2', 'test3']} | ${'test1'}
		${'test2'} | ${['test1', 'test2', 'test3']} | ${'test2'}
		${'test3'} | ${['test1', 'test2', 'test3']} | ${'test3'}
		${'test4'} | ${['test1', 'test2', 'test3']} | ${ON_TYPE_IS_LIST_DEFAULT}
	`(
		'On filter.filtration = "is", filter.value = $value, filter.listValues = $listValues, onTypeIsList should return $result',
		({ value, listValues, result }) => {
			const functionResult = onTypeIsList({
				id: 0,
				type: FilterBaseType.LIST,
				name: FilterBaseName.TAGS,
				listValues: listValues,
				filtration: 'is',
				value: value
			})

			expect(functionResult).toBe(result)
		}
	)

	it.each`
		value      | listValues                     | result
		${'test1'} | ${['test1', 'test2']}          | ${'test2'}
		${'test2'} | ${['test1', 'test2']}          | ${'test1'}
		${'test1'} | ${['test1', 'test2', 'test3']} | ${'(test2,test3)'}
		${'test2'} | ${['test1', 'test2', 'test3']} | ${'(test1,test3)'}
		${'test3'} | ${['test1', 'test2', 'test3']} | ${'(test1,test2)'}
		${'test4'} | ${['test1', 'test2', 'test3']} | ${ON_TYPE_IS_LIST_DEFAULT}
	`(
		'On filter.filtration = "is except", filter.value = $value, filter.listValues = $listValues, onTypeIsList should return $result',
		({ value, listValues, result }) => {
			const functionResult = onTypeIsList({
				id: 0,
				type: FilterBaseType.LIST,
				name: FilterBaseName.TAGS,
				listValues: listValues,
				filtration: 'is except',
				value: value
			})

			expect(functionResult).toBe(result)
		}
	)

	it('On filter.filtration = "wrong" onTypeIsList should throw error', () => {
		expect(() =>
			onTypeIsList({
				id: 0,
				type: FilterBaseType.LIST,
				name: FilterBaseName.TAGS,
				listValues: [],
				// @ts-expect-error
				filtration: 'wrong',
				value: 'story'
			})
		).toThrowError('Invalid filter.filtration = wrong in onTypeIsList')
	})
})
