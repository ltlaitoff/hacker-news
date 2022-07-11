import { checkInputValueOnError } from './index'

describe('checkInputValueOnError', () => {
	it.each`
		value              | result
		${'hello'}         | ${false}
		${'t'.repeat(100)} | ${true}
		${{ length: -10 }} | ${true}
	`(
		'checkInputValueOnError with value = $value should call callback function with $result and return $result',
		({ value, result }) => {
			const callback = jest.fn()

			const functionReturn = checkInputValueOnError(value, callback)

			expect(callback).toBeCalledWith(result)
			expect(functionReturn).toBe(result)
		}
	)
})
