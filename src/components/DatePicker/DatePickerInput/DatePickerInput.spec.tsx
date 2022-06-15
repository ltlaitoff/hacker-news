import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DatePickerInput from './DatePickerInput'

describe('DatePickerInput', () => {
	it('DatePickerInput should be in the document', () => {
		let onSubmit = jest.fn()

		render(
			<DatePickerInput
				date={new Date('01-01-2022')}
				format={'dd-MM-Y'}
				onSubmit={onSubmit}
			/>
		)

		const input = screen.getByTestId('input')

		expect(input).toBeInTheDocument()
	})

	describe.each`
		date                      | format       | inputValue
		${new Date('01-01-2022')} | ${'dd-MM-Y'} | ${'31-12-2022'}
		${new Date('01-02-2022')} | ${'d-M-Y'}   | ${'3-2-2022'}
	`(
		'date = $date, format = $format, valid data = $inputValue',
		({ date, format, inputValue }) => {
			let onSubmit = jest.fn()
			let input: HTMLInputElement

			beforeEach(() => {
				onSubmit = jest.fn()

				render(
					<DatePickerInput date={date} format={format} onSubmit={onSubmit} />
				)

				input = screen.getByTestId('input') as HTMLInputElement
			})

			it('Valid data entry and press Enter button, onSubmit should be called', () => {
				user.clear(input)
				user.type(input, inputValue + '{Enter}')

				expect(onSubmit).toBeCalled()
				expect(input).toHaveAttribute('data-error', 'false')
			})

			it('Valid data entry and blur from input, onSubmit should be called', () => {
				user.clear(input)
				user.type(input, inputValue)
				user.tab()

				expect(onSubmit).toBeCalled()
				expect(input).toHaveAttribute('data-error', 'false')
			})

			it('Not valid data entry and press Enter button, onSubmit should be NOT called', () => {
				user.clear(input)
				user.type(input, 'not valid data{Enter}')

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'true')
			})

			it('Not valid data entry and blur from input, onSubmit should be NOT called', () => {
				user.clear(input)
				user.type(input, 'not valid data')
				user.tab()

				expect(onSubmit).not.toBeCalled()
				expect(input).toHaveAttribute('data-error', 'true')
			})
		}
	)

	it.each`
		format
		${'test'}
		${'random format'}
	`('with not valid format = $format', ({ format }) => {
		let onSubmit = jest.fn()

		render(
			<DatePickerInput
				date={new Date('01-01-2022')}
				format={format}
				onSubmit={onSubmit}
			/>
		)

		const input = screen.getByTestId('input')

		expect(input).toHaveAttribute('data-error', 'true')
	})

	it.each`
		date
		${new Date('test')}
	`('with not valid default date = $date', ({ date }) => {
		let onSubmit = jest.fn()

		render(
			<DatePickerInput date={date} format={'dd-MM-Y'} onSubmit={onSubmit} />
		)

		const input = screen.getByTestId('input')

		expect(input).toHaveAttribute('data-error', 'true')
	})
})
