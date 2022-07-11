import { checkElementInArray } from './checkElementIn'

describe('checkElementIn', () => {
	it.each`
		arr                | element  | result
		${[1, 2, 3]}       | ${1}     | ${true}
		${['g', 'f', 'h']} | ${'g'}   | ${true}
		${['g', 'f', 'h']} | ${'rnd'} | ${false}
		${[true, false]}   | ${true}  | ${true}
	`(
		'checkElementInArray with array = $arr, element = $element should return $result',
		({ arr, element, result }) => {
			expect(checkElementInArray(arr, element)).toBe(result)
		}
	)
})
