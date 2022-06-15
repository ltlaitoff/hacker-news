import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'

import DatePicker from './DatePicker'
import { DatePickerProps } from '../interfaces'

const setup = ({ value, onChange, disabled, format }: DatePickerProps) => {
	render(
		<DatePicker
			value={value}
			onChange={onChange}
			disabled={disabled}
			format={format}
		/>
	)
}

describe('DatePicker', () => {
	it('DatePicker should be in the document', () => {
		setup({ value: null, onChange: jest.fn() })

		expect(screen.getByTestId('picker')).toBeInTheDocument()
	})

	it('After onClick on block calendar should seem', () => {
		setup({ value: null, onChange: jest.fn() })

		const picker = screen.getByTestId('picker')
		user.click(picker)

		const calendar = screen.getByTestId('calendar')
		expect(calendar).toBeInTheDocument()
	})

	it('After onClick on block and press Esc key calendar should hide', () => {
		setup({ value: null, onChange: jest.fn() })

		const picker = screen.getByTestId('picker')
		user.click(picker)

		const calendar = screen.getByTestId('calendar')
		expect(calendar).toBeInTheDocument()

		user.keyboard('{esc}')
		expect(calendar).not.toBeInTheDocument()
	})

	it('After onClick on block and click outside of block calendar should hide', () => {
		setup({ value: null, onChange: jest.fn() })

		const picker = screen.getByTestId('picker')
		user.click(picker)

		const calendar = screen.getByTestId('calendar')
		expect(calendar).toBeInTheDocument()

		user.click(document.body)
		expect(calendar).not.toBeInTheDocument()
	})

	it('On disabled = true, after onClick on block calendar should NOT seem', () => {
		setup({ value: null, onChange: jest.fn(), disabled: true })

		const picker = screen.getByTestId('picker')
		user.click(picker)

		const calendar = screen.queryByTestId('calendar')
		expect(calendar).not.toBeInTheDocument()
	})

	it('After press enter on input calendar should hide', () => {
		setup({
			value: new Date('01-01-2022'),
			onChange: jest.fn()
		})

		const input = screen.getByTestId('input') as HTMLInputElement

		user.click(input)

		const calendar = screen.getByTestId('calendar')
		expect(calendar).toBeInTheDocument()

		user.type(input, '{Enter}')

		expect(calendar).not.toBeInTheDocument()
	})

	it('After press enter on input element, after entering the correct value into input, onChange should be called with date', () => {
		const onChange = jest.fn()

		setup({
			value: new Date('01-01-2022'),
			onChange
		})

		const input = screen.getByTestId('input') as HTMLInputElement

		user.clear(input)
		user.type(input, '31-07-2020{Enter}')

		expect(onChange).toBeCalledWith(new Date('07-31-2020'))
	})

	it('After click outside, after entering the correct value into input, onChange should be called', () => {
		const onChange = jest.fn()

		setup({
			value: new Date('01-01-2022'),
			onChange
		})

		const input = screen.getByTestId('input') as HTMLInputElement

		user.clear(input)
		user.type(input, '31-07-2020')
		user.click(document.body)

		expect(onChange).toBeCalledWith(new Date('07-31-2020'))
	})
})
