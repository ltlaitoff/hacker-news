import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import RangeDateInput from './RangeDateInput'
import { DateInputProps } from '../../DatePicker.interfaces'

function setup({
	date = [new Date('01-01-2022'), new Date('01-01-2022')],
	format = 'dd-MM-Y',
	onSubmit = jest.fn(),
	onError = jest.fn(),
	error = false,
	disabled = false,
	...args
}: Partial<DateInputProps>) {
	render(
		<RangeDateInput
			date={date}
			format={format}
			onSubmit={onSubmit}
			onError={onError}
			error={error}
			disabled={disabled}
			{...args}
		/>
	)
}

describe('DatePicker/RangeDateInput', () => {
	it('RangeDateInput should be in the document', () => {
		setup({})

		expect(screen.getByTestId('range')).toBeInTheDocument()
	})

	it('RangeDateInput should contains two inputs', () => {
		setup({})

		const inputs = screen.getAllByRole('textbox')

		expect(inputs).toHaveLength(2)
	})

	it('On first input invalid date prop = [Date("invalid"), Date("01-01-2022")] onError should be called with true', () => {
		const onError = jest.fn()

		setup({ date: [new Date('invalid'), new Date('01-01-2022')], onError })

		expect(onError).toBeCalledWith(true)
	})

	it('On second input invalid date prop = [Date("01-01-2022"), Date("invalid")] onError should be called with true', () => {
		const onError = jest.fn()

		setup({ date: [new Date('01-01-2022'), new Date('invalid')], onError })

		expect(onError).toBeCalledWith(true)
	})

	it('On change value on "invalid" in first input and press Enter, onError should be called with true', () => {
		const onError = jest.fn()
		setup({ onError })

		const input = screen.getByTestId('first-input')
		user.clear(input)
		user.type(input, 'invalid{Enter}')

		expect(onError).toBeCalledWith(true)
	})

	it('On change value on "invalid" in second input and press Enter, onError should be called with true', () => {
		const onError = jest.fn()
		setup({ onError })

		const input = screen.getByTestId('second-input')
		user.clear(input)
		user.type(input, 'invalid{Enter}')

		expect(onError).toBeCalledWith(true)
	})

	it('On change value on "02-01-2022" in first input and press Enter, onSubmit should be called with ["02-01-2022"(as Date), "01-01-2022"(as Date)], "enterKey"', () => {
		const onSubmit = jest.fn()
		setup({ onSubmit })

		const input = screen.getByTestId('first-input')
		user.clear(input)
		user.type(input, '02-01-2022{Enter}')

		expect(onSubmit).toBeCalledWith(
			[new Date('01-02-2022'), new Date('01-01-2022')],
			'enterKey'
		)
	})

	it('On change value on "02-01-2022" in second input and press Enter, onSubmit should be called with [Date("02-01-2022"), Date("01-01-2022")], "enterKey"', () => {
		const onSubmit = jest.fn()
		setup({ onSubmit })

		const input = screen.getByTestId('second-input')
		user.clear(input)
		user.type(input, '02-01-2022{Enter}')

		expect(onSubmit).toBeCalledWith(
			[new Date('01-01-2022'), new Date('01-02-2022')],
			'enterKey'
		)
	})

	it('test-arg="test" custom attribute should be in outer html', () => {
		// @ts-expect-error
		setup({ 'test-arg': 'test' })

		const range = screen.getByTestId('range')

		expect(range).toHaveAttribute('test-arg', 'test')
	})
})
