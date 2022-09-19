import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DatePickerInput from './DatePickerInput'
import { DatePickerInputProps } from './DatePickerInput.interfaces'

const ON_CHANGE_TYPES = {
	BLUR: 'blur_mock',
	ENTER_KEY: 'enterKey_mock',
	CALENDAR: 'calendar_mock'
}

jest.mock('./DatePickerInput.interfaces', () => ({
	onChangeTypes: ON_CHANGE_TYPES
}))

const setup = ({
	date = new Date('01-01-2022'),
	error = false,
	format = 'dd-MM-Y',
	onSubmit = jest.fn(),
	onError = jest.fn(),
	disabled = false,
	...args
}: Partial<DatePickerInputProps> = {}) => {
	render(
		<DatePickerInput
			date={date}
			error={error}
			format={format}
			onSubmit={onSubmit}
			onError={onError}
			disabled={disabled}
			{...args}
		/>
	)
}

describe('DatePicker/DatePickerInput', () => {
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
		'With format = $format, inputValueDate = $inputValueDate and inputValue = $inputValue',
		({ format, inputValue, inputValueDate }) => {
			let onSubmit = jest.fn()
			let onError = jest.fn()
			let input: HTMLInputElement

			beforeEach(() => {
				onSubmit = jest.fn()
				onError = jest.fn()

				setup({ format, onSubmit, onError })

				input = screen.getByTestId('input') as HTMLInputElement
				user.clear(input)
			})

			it(`On valid data entry = ${inputValue} and press Enter key, onError should be called with false and onSubmit should be called with (${inputValueDate}, ${ON_CHANGE_TYPES.ENTER_KEY})`, () => {
				user.type(input, inputValue + '{Enter}')

				expect(onSubmit).toBeCalledWith(
					inputValueDate,
					ON_CHANGE_TYPES.ENTER_KEY
				)
				expect(onError).toBeCalledWith(false)
			})

			it(`On valid data entry = ${inputValue} and blur from input, onError should be called with false and onSubmit should be called with (${inputValueDate}, ${ON_CHANGE_TYPES.BLUR})`, () => {
				user.type(input, inputValue)
				user.tab()

				expect(onSubmit).toBeCalledWith(inputValueDate, ON_CHANGE_TYPES.BLUR)
				expect(onError).toBeCalledWith(false)
			})
		}
	)

	describe.each`
		inputValue
		${'test'}
		${'invalid'}
	`('With invalid inputValue = $inputValue', ({ inputValue }) => {
		let onSubmit = jest.fn()
		let onError = jest.fn()
		let input: HTMLInputElement

		beforeEach(() => {
			onSubmit = jest.fn()
			onError = jest.fn()

			setup({ onSubmit, onError })

			input = screen.getByTestId('input') as HTMLInputElement
			user.clear(input)
		})

		it(`On entry invalid data = ${inputValue} and press Enter button, onSubmit should not be called and onError should be called with true`, () => {
			user.type(input, inputValue + '{Enter}')

			expect(onSubmit).not.toBeCalled()
			expect(onError).toBeCalledWith(true)
		})

		it(`On entry invalid data = ${inputValue} and blur from input, onSubmit should not be called and onError should be called with true`, () => {
			user.type(input, inputValue)
			user.tab()

			expect(onSubmit).not.toBeCalled()
			expect(onError).toBeCalledWith(true)
		})
	})

	describe.each`
		validInputValue | invalidInputValue
		${'31-12-2022'} | ${'123'}
		${'03-02-2022'} | ${'123'}
	`(
		'With disabled = true, validInputValue = $validInputValue and invalidInputValue = $invalidInputValue',
		({ validInputValue, invalidInputValue }) => {
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
				user.clear(input)
			})

			it(`On entry valid data = ${validInputValue} and press Enter button, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, inputValue + '{Enter}')
				expect(inputValueBefore).toBe(input.value)

				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})

			it(`On entry valid data = ${validInputValue} and blur from input, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, inputValue)
				user.tab()

				expect(inputValueBefore).toBe(input.value)
				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})

			it(`On entry NOT valid data = ${invalidInputValue} and press Enter button, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, 'not valid data{Enter}')

				expect(inputValueBefore).toBe(input.value)
				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})

			it(`On entry NOT valid data = ${invalidInputValue} and blur from input, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, 'not valid data')
				user.tab()

				expect(inputValueBefore).toBe(input.value)
				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})
		}
	)

	describe.each`
		validInputValue | invalidInputValue
		${'31-12-2022'} | ${'123'}
		${'03-02-2022'} | ${'123'}
	`(
		'With disabled = true(but user in code remove disabled param from input), validInputValue = $validInputValue and invalidInputValue = $invalidInputValue',
		({ validInputValue, invalidInputValue }) => {
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
				input.disabled = false
				user.clear(input)
			})

			it(`On entry valid data = ${validInputValue} and press Enter button, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, inputValue + '{Enter}')
				expect(inputValueBefore).toBe(input.value)

				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})

			it(`On entry valid data = ${validInputValue} and blur from input, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, inputValue)
				user.tab()

				expect(inputValueBefore).toBe(input.value)
				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})

			it(`On entry NOT valid data = ${invalidInputValue} and press Enter button, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, 'not valid data{Enter}')

				expect(inputValueBefore).toBe(input.value)
				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})

			it(`On entry NOT valid data = ${invalidInputValue} and blur from input, input.value should not be changed, onSubmit should not be called and onError should not be called`, () => {
				const inputValueBefore = input.value

				user.type(input, 'not valid data')
				user.tab()

				expect(inputValueBefore).toBe(input.value)
				expect(onSubmit).not.toBeCalled()
				expect(onError).not.toBeCalled()
			})
		}
	)

	describe('Check invalid props', () => {
		it.each`
			format
			${'test'}
			${'random format'}
		`(
			'with not valid format = $format onError should be called with true',
			({ format }) => {
				let onError = jest.fn()
				setup({ format, onError })

				expect(onError).toBeCalledWith(true)
			}
		)

		it.each`
			date
			${new Date('test')}
			${new Date('145sdfg')}
		`(
			'with not valid default date = $date onError should be called with true',
			({ date }) => {
				let onError = jest.fn()
				setup({ date, onError })

				expect(onError).toBeCalledWith(true)
			}
		)
	})

	it('On error prop = true, after change input value onError should be called with false', () => {
		const onError = jest.fn()
		setup({ error: true, onError: onError })

		const input = screen.getByTestId('input')

		user.type(input, 's')

		expect(onError).toBeCalledWith(false)
	})

	it('test-attribute should be in html', () => {
		// @ts-expect-error
		setup({ 'test-attribute': 'test' })
		const input = screen.getByTestId('input')
		expect(input).toHaveAttribute('test-attribute', 'test')
	})
})
