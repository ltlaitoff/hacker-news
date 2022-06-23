import { checkElementIsItem } from '../helpers'

describe('onKeyPressObserver checkElementIsItem', () => {
	let callback = jest.fn()

	beforeEach(() => {
		callback = jest.fn()
	})

	it.each`
		element                            | key   | callback    | result
		${{ key: 1, callback: callback }}  | ${1}  | ${callback} | ${true}
		${{ key: 15, callback: callback }} | ${15} | ${callback} | ${true}
		${{ key: 12, callback: callback }} | ${12} | ${() => {}} | ${false}
		${{ key: 12, callback: () => {} }} | ${12} | ${callback} | ${false}
		${{ key: 12, callback: callback }} | ${1}  | ${callback} | ${false}
		${{ key: 1, callback: callback }}  | ${12} | ${callback} | ${false}
		${{ key: 13, callback: () => {} }} | ${12} | ${callback} | ${false}
	`(
		'checkElementIsItem with element = $element, key = $key, callback = $callback should return $result',
		({ element, key, callback, result }) => {
			expect(checkElementIsItem(element, key, callback)).toBe(result)
		}
	)
})
