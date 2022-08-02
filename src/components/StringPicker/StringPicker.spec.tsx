import React, { FormEvent } from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import StringPicker from './StringPicker'
import { StringPickerProps } from './StringPicker.interfaces'
/*
	Input should be in the document
	On value = $value, input should have value = $value
	On disabled = true, input should have disable arrtibute
	On value = undefined input should have value = ""
	On write into input text = "test", onChange should be called on every letter
	On value = undefined, data-error on input should be true
	On value = "", data-error on input should be true
	On value = "test", after clear input value, onError should be called with true
	On value = "test", after clear input value, data-error on input should be true
	On value = "", after write text in input = "testr", onError should be called with false
	On value = "", after write text in input = "testr", data-error on input should be false
	On disabled = true, after write text into input, onChange should not be called
	Custom attribute data-hello = "true" should be on the input
*/

jest.mock('helpers', () => ({
	getValueFromEvent: (e: FormEvent<HTMLInputElement>) => {
		return (e.target as HTMLInputElement).value
	}
}))

const setup = ({
	value = undefined,
	onChange = jest.fn(),
	disabled = false,
	onError = jest.fn(),
	customAttributes = {}
}: Partial<StringPickerProps> & {
	customAttributes?: Record<string, string>
} = {}) => {
	render(
		<StringPicker
			value={value}
			onChange={onChange}
			disabled={disabled}
			onError={onError}
			{...customAttributes}
		/>
	)
}

describe('components/StringPicker', () => {
	it('input should be in the document', () => {
		setup()

		const input = screen.getByTestId('input')
		expect(input).toBeInTheDocument()
	})

	it.each`
		value
		${'test'}
		${'gsg'}
		${'1212312'}
	`('On value = $value, input should have value = $value', ({ value }) => {
		setup({ value })

		const input = screen.getByTestId('input') as HTMLInputElement

		expect(input.value).toBe(value)
	})

	it('On disabled = true, input should have disable arrtibute', () => {
		setup({ disabled: true })

		const input = screen.getByTestId('input')

		expect(input).toHaveAttribute('disabled')
	})

	it('On value = undefined input should have value = ""', () => {
		setup({ value: undefined })

		const input = screen.getByTestId('input') as HTMLInputElement

		expect(input.value).toBe('')
	})

	it('On write into input text = "test", onChange should be called on every letter', () => {
		const onChange = jest.fn()
		setup({ onChange })

		const input = screen.getByTestId('input') as HTMLInputElement

		user.type(input, 't')
		expect(onChange).toBeCalledWith('t')

		user.type(input, 'e')
		expect(onChange).toBeCalledWith('te')

		user.type(input, 's')
		expect(onChange).toBeCalledWith('tes')

		user.type(input, 't')
		expect(onChange).toBeCalledWith('test')
	})

	it('On value = undefined, data-error on input should be true', () => {
		setup({ value: undefined })

		const input = screen.getByTestId('input') as HTMLInputElement

		expect(input).toHaveAttribute('data-error', 'true')
	})

	it('On value = "", data-error on input should be true', () => {
		setup({ value: '' })

		const input = screen.getByTestId('input') as HTMLInputElement

		expect(input).toHaveAttribute('data-error', 'true')
	})

	it('On value = "test", after clear input value, onError should be called with true', () => {
		const onError = jest.fn()
		setup({ value: 'test', onError })

		const input = screen.getByTestId('input') as HTMLInputElement

		user.clear(input)

		expect(onError).toBeCalledWith(true)
	})

	it('On value = "test", after clear input value, data-error on input should be true', () => {
		setup({ value: 'test' })

		const input = screen.getByTestId('input') as HTMLInputElement
		user.clear(input)

		expect(input).toHaveAttribute('data-error', 'true')
	})

	it('On value = "", after write text in input = "test", onError should be called with false', () => {
		const onError = jest.fn()
		setup({ value: '', onError })

		const input = screen.getByTestId('input') as HTMLInputElement
		user.type(input, 'test')

		expect(onError).toBeCalledWith(false)
	})

	it('On value = "", after write text in input = "test", data-error on input should be false', () => {
		setup({ value: '' })

		const input = screen.getByTestId('input') as HTMLInputElement
		expect(input).toHaveAttribute('data-error', 'true')

		user.type(input, 'test')

		expect(input).toHaveAttribute('data-error', 'false')
	})

	it('On disabled = true, after write text into input, onChange should not be called and value should not be changed', () => {
		const onChange = jest.fn()
		setup({ value: '132', disabled: true, onChange })

		const input = screen.getByTestId('input') as HTMLInputElement
		user.type(input, 'test')

		expect(input.value).toBe('132')
		expect(onChange).not.toBeCalled()
	})

	it('Custom attribute data-hello = "1" should be on the input', () => {
		setup({ customAttributes: { 'data-hello': '1' } })

		const input = screen.getByTestId('input') as HTMLInputElement

		expect(input).toHaveAttribute('data-hello', '1')
	})
})
