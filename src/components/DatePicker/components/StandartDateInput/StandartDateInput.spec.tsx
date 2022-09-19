import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import StandartDateInput from './StandartDateInput'
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
		<StandartDateInput
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

describe('StandartDateInput', () => {
	it('StandartDateInput to be in the document', () => {
		setup({})
		expect(screen.getByTestId('input')).toBeInTheDocument()
	})

	it('On change value on "02-01-2022" in input and press Enter, onSubmit should be called with ([Date("02-01-2022"), Date("02-01-2022")], "enterKey")', () => {
		const onSubmit = jest.fn()
		setup({ onSubmit })

		const input = screen.getByTestId('input')
		user.clear(input)
		user.type(input, '02-01-2022{Enter}')

		expect(onSubmit).toBeCalledWith(
			[new Date('01-02-2022'), new Date('01-02-2022')],
			'enterKey'
		)
	})

	it('onError should be called with date = Date("invalid")', () => {
		const onError = jest.fn()

		setup({ date: [new Date('invalid'), new Date('invalid')], onError })

		expect(onError).toBeCalledWith(true)
	})

	it('onError should be called if change value on "02-01-2022" in input and press Enter', () => {
		const onError = jest.fn()
		setup({ onError })

		const input = screen.getByTestId('input')
		user.clear(input)
		user.type(input, 'invalid date{Enter}')

		expect(onError).toBeCalledWith(true)
	})

	it('test-arg="test" custom attribute should be in outer html', () => {
		// @ts-expect-error
		setup({ 'test-arg': 'test' })

		const input = screen.getByTestId('input')

		expect(input).toHaveAttribute('test-arg', 'test')
	})
})
