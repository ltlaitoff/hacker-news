import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DatePickerInput from './DatePickerInput'

describe('DatePickerInput', () => {
	it('DatePickerInput should be in the document', () => {
		render(
			<DatePickerInput
				date={new Date('01-01-2022')}
				format={'dd-MM-Y'}
				onSubmit={jest.fn()}
				onError={jest.fn()}
			/>
		)

		const input = screen.getByTestId('input')

		expect(input).toBeInTheDocument()
	})

	describe.each`
		date                      | format       | inputValue      | inputValueDate
		${new Date('01-01-2022')} | ${'dd-MM-Y'} | ${'31-12-2022'} | ${new Date('12-31-2022')}
		${new Date('01-02-2022')} | ${'d-M-Y'}   | ${'3-2-2022'}   | ${new Date('02-03-2022')}
	`(
		'date = $date, format = $format, valid data = $inputValue',
		({ date, format, inputValue, inputValueDate }) => {
			let onSubmit = jest.fn()
			let onError = jest.fn()
			let input: HTMLInputElement

			beforeEach(() => {
				onSubmit = jest.fn()
				onError = jest.fn()

				render(
					<DatePickerInput
						date={date}
						format={format}
						onSubmit={onSubmit}
						onError={onError}
					/>
				)

				input = screen.getByTestId('input') as HTMLInputElement
			})

			it('Valid data entry and press Enter button, onSubmit should be called', () => {
				user.clear(input)
				user.type(input, inputValue + '{Enter}')

				expect(onSubmit).toBeCalledWith(inputValueDate, 'enterKey')
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).toBeCalledWith(false)
			})

			it('Valid data entry and blur from input, onSubmit should be called', () => {
				user.clear(input)
				user.type(input, inputValue)
				user.tab()

				expect(onSubmit).toBeCalledWith(inputValueDate, 'blur')
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).toBeCalledWith(false)
			})

			// TODO: Move it
			it('Not valid data entry and press Enter button, onSubmit should be NOT called', () => {
				user.clear(input)
				user.type(input, 'not valid data{Enter}')

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'true')
				expect(onError).toBeCalledWith(true)
			})

			it('Not valid data entry and blur from input, onSubmit should be NOT called', () => {
				user.clear(input)
				user.type(input, 'not valid data')
				user.tab()

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'true')
				expect(onError).toBeCalledWith(true)
			})
		}
	)

	describe.each`
		stringDate      | format       | inputValue
		${'01-01-2022'} | ${'dd-MM-Y'} | ${'31-12-2022'}
		${'07-07-2022'} | ${'dd-MM-Y'} | ${'31-12-2022'}
	`(
		'date = $stringDate, format = $format, valid data = $inputValue, disabled = true',
		({ stringDate, format, inputValue }) => {
			let onSubmit = jest.fn()
			let onError = jest.fn()
			let input: HTMLInputElement

			beforeEach(() => {
				onSubmit = jest.fn()
				onError = jest.fn()

				render(
					<DatePickerInput
						date={new Date(stringDate)}
						format={format}
						onSubmit={onSubmit}
						onError={onError}
						disabled={true}
					/>
				)

				input = screen.getByTestId('input') as HTMLInputElement
			})

			it('Valid data entry and press Enter button, onSubmit should NOT be called and input value should be not changes', () => {
				const inputValueBefore = input.value

				user.clear(input)
				user.type(input, inputValue + '{Enter}')

				expect(inputValueBefore).toBe(input.value)

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).not.toBeCalled()
			})

			it('Valid data entry and blur from input, onSubmit should be NOT called and input value should be not changes', () => {
				const inputValueBefore = input.value

				user.clear(input)
				user.type(input, inputValue)
				user.tab()

				expect(inputValueBefore).toBe(input.value)

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).not.toBeCalled()
			})

			it('Not valid data entry and press Enter button, onSubmit should be NOT called and input value should be not changes', () => {
				const inputValueBefore = input.value

				user.clear(input)
				user.type(input, 'not valid data{Enter}')

				expect(inputValueBefore).toBe(input.value)

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).not.toBeCalled()
			})

			it('Not valid data entry and blur from input, onSubmit should be NOT called and input value should be not changes', () => {
				const inputValueBefore = input.value

				user.clear(input)
				user.type(input, 'not valid data')
				user.tab()

				expect(inputValueBefore).toBe(input.value)

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'false')
				expect(onError).not.toBeCalled()
			})
		}
	)

	it.each`
		format
		${'test'}
		${'random format'}
	`('with not valid format = $format', ({ format }) => {
		let onSubmit = jest.fn()
		let onError = jest.fn()

		render(
			<DatePickerInput
				date={new Date('01-01-2022')}
				format={format}
				onSubmit={onSubmit}
				onError={onError}
			/>
		)

		const input = screen.getByTestId('input')

		expect(onError).toBeCalledWith(true)
		expect(input).toHaveAttribute('data-error', 'true')
	})

	it.each`
		date
		${new Date('test')}
	`('with not valid default date = $date', ({ date }) => {
		let onSubmit = jest.fn()
		let onError = jest.fn()

		render(
			<DatePickerInput
				date={date}
				format={'dd-MM-Y'}
				onSubmit={onSubmit}
				onError={onError}
			/>
		)

		expect(onError).toBeCalledWith(true)
	})

	it('test-attribute should be in html', () => {
		let onSubmit = jest.fn()
		let onError = jest.fn()

		render(
			<DatePickerInput
				date={new Date('01-01-2022')}
				format={'dd-MM-Y'}
				onSubmit={onSubmit}
				onError={onError}
				test-attribute={'test'}
			/>
		)

		const input = screen.getByTestId('input')

		expect(input).toHaveAttribute('test-attribute', 'test')
	})
})
