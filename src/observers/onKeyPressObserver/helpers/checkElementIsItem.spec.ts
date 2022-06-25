import { checkElementIsItem } from '../helpers'

describe('onKeyPressObserver checkElementIsItem', () => {
	let callback = jest.fn()

	beforeEach(() => {
		callback = jest.fn()
	})

	it.each`
		element                   | callback    | result
		${{ callback: callback }} | ${callback} | ${true}
		${{ callback: callback }} | ${() => {}} | ${false}
		${{ callback: () => {} }} | ${callback} | ${false}
	`(
		'checkElementIsItem with element = $element, callback = $callback should return $result',
		({ element, callback, result }) => {
			expect(checkElementIsItem(element, callback)).toBe(result)
		}
	)
})
