import { FilterBaseName, FilterBaseType } from 'typescript/filters'
import { onTypeIsString } from '.'

describe('api/helpers/getTagsAndNumericFiltersParam/functions/onTypeIsString', () => {
	it.each`
		value
		${'test'}
		${'random'}
		${'reas'}
		${''}
	`(
		'onTypeIsString with filter.value = $value and options = undefined should return $value',
		({ value }) => {
			const result = onTypeIsString({
				id: 0,
				name: FilterBaseName.AUTHOR,
				type: FilterBaseType.STRING,
				filtration: 'is',
				value: value
			})

			expect(result).toEqual(value)
		}
	)

	it.each`
		value     | key       | result
		${'test'} | ${'key'}  | ${'key_test'}
		${'gg'}   | ${'user'} | ${'user_gg'}
		${''}     | ${'key'}  | ${''}
		${'test'} | ${''}     | ${'test'}
	`(
		'onTypeIsString with filter.value = $value and options = {key: $key} should return $result',
		({ value, key, result }) => {
			const functionResult = onTypeIsString(
				{
					id: 0,
					name: FilterBaseName.AUTHOR,
					type: FilterBaseType.STRING,
					filtration: 'is',
					value: value
				},
				{ key: key }
			)

			expect(functionResult).toEqual(result)
		}
	)
})
