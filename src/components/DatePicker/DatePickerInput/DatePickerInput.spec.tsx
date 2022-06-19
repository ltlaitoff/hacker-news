import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DatePickerInput from './DatePickerInput'
import { DatePickerInputProps } from './DatePickerInput.interfaces'

const setup = ({
	date = new Date('01-01-2022'),
	format = 'dd-MM-Y',
	onSubmit = jest.fn(),
	onError = jest.fn(),
	disabled = false,
	...args
}: Partial<DatePickerInputProps> = {}) => {
	render(
		<DatePickerInput
			date={date}
			format={format}
			onSubmit={onSubmit}
			onError={onError}
			disabled={disabled}
			{...args}
		/>
	)
}

describe('DatePickerInput', () => {
	it('DatePickerInput should be in the document', () => {
		setup()

		const input = screen.getByTestId('input')
		expect(input).toBeInTheDocument()
	})

	describe.each`
		format       | inputValue      | inputValueDate
		${'dd-MM-Y'} | ${'31-12-2022'} | ${new Date('12-31-2022')}
		${'d-M-Y'}   | ${'3-2-2022'}   | ${new Date('02-03-2022')}
	`(
		'onSubmit should be called with format = $format and valid inputValueDate = $inputValueDate',
		({ format, inputValue, inputValueDate }) => {
			let onSubmit = jest.fn()
			let onError = jest.fn()
			let input: HTMLInputElement

			beforeEach(() => {
				onSubmit = jest.fn()
				onError = jest.fn()

				setup({ format, onSubmit, onError })

				input = screen.getByTestId('input') as HTMLInputElement
			})

			it('Valid data entry and press Enter button', () => {
				user.clear(input)
				user.type(input, inputValue + '{Enter}')

				expect(onSubmit).toBeCalledWith(inputValueDate, 'enterKey')
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).toBeCalledWith(false)
			})

			it('Valid data entry and blur from input', () => {
				user.clear(input)
				user.type(input, inputValue)
				user.tab()

				expect(onSubmit).toBeCalledWith(inputValueDate, 'blur')
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).toBeCalledWith(false)
			})
		}
	)

	describe.each`
		inputValueDate
		${'test'}
		${'invalid'}
	`(
		'onSubmit should be NOT called with invalid inputValueDate = $inputValueDate',
		({ inputValueDate }) => {
			let onSubmit = jest.fn()
			let onError = jest.fn()
			let input: HTMLInputElement

			beforeEach(() => {
				onSubmit = jest.fn()
				onError = jest.fn()

				setup({ onSubmit, onError })

				input = screen.getByTestId('input') as HTMLInputElement
			})

			it('Invalid data entry and press Enter button', () => {
				user.clear(input)
				user.type(input, inputValueDate + '{Enter}')

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'true')
				expect(onError).toBeCalledWith(true)
			})

			it('Invalid data entry and blur from input', () => {
				user.clear(input)
				user.type(input, inputValueDate)
				user.tab()

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'true')
				expect(onError).toBeCalledWith(true)
			})
		}
	)

	describe('onSubmit should NOT be called and input value should be not changes with disabled = true, inputValue = "test"', () => {
		const inputValue = 'test'
		let onSubmit = jest.fn()
		let onError = jest.fn()
		let input: HTMLInputElement

		beforeEach(() => {
			onSubmit = jest.fn()
			onError = jest.fn()

			setup({
				onError,
				onSubmit,
				disabled: true
			})

			input = screen.getByTestId('input') as HTMLInputElement
		})

		it('Valid data entry and press Enter button', () => {
			const inputValueBefore = input.value

			user.clear(input)
			user.type(input, inputValue + '{Enter}')

			expect(inputValueBefore).toBe(input.value)

			expect(onSubmit).not.toBeCalled()
			expect(input).toHaveAttribute('data-error', 'false')
			expect(onError).not.toBeCalled()
		})

		it('Valid data entry and blur from input', () => {
			const inputValueBefore = input.value

			user.clear(input)
			user.type(input, inputValue)
			user.tab()

			expect(inputValueBefore).toBe(input.value)

			expect(onSubmit).not.toBeCalled()
			expect(input).toHaveAttribute('data-error', 'false')
			expect(onError).not.toBeCalled()
		})

		it('Not valid data entry and press Enter button', () => {
			const inputValueBefore = input.value

			user.clear(input)
			user.type(input, 'not valid data{Enter}')

			expect(inputValueBefore).toBe(input.value)

			expect(onSubmit).not.toBeCalled()
			expect(input).toHaveAttribute('data-error', 'false')
			expect(onError).not.toBeCalled()
		})

		it('Not valid data entry and blur from input', () => {
			const inputValueBefore = input.value

			user.clear(input)
			user.type(input, 'not valid data')
			user.tab()

			expect(inputValueBefore).toBe(input.value)

			expect(onSubmit).not.toBeCalled()
			expect(input).toHaveAttribute('data-error', 'false')
			expect(onError).not.toBeCalled()
		})
	})

	it.each`
		format
		${'test'}
		${'random format'}
	`(
		'with not valid format = $format onError should be called',
		({ format }) => {
			let onError = jest.fn()

			setup({ format, onError })

			const input = screen.getByTestId('input')

			expect(input).toHaveAttribute('data-error', 'true')
			expect(onError).toBeCalledWith(true)
		}
	)

	it.each`
		date
		${new Date('test')}
	`(
		'with not valid default date = $date onError should be called',
		({ date }) => {
			let onError = jest.fn()

			setup({ date, onError })

			const input = screen.getByTestId('input')

			expect(input).toHaveAttribute('data-error', 'true')
			expect(onError).toBeCalledWith(true)
		}
	)

	it('test-attribute should be in html', () => {
		// @ts-expect-error
		setup({ 'test-attribute': 'test' })

		const input = screen.getByTestId('input')

		expect(input).toHaveAttribute('test-attribute', 'test')
	})
})
