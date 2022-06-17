import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import RangeDateInput from './RangeDateInput'
import { DateInputProps } from '../../interfaces'

function setup({
	date = [new Date('01-01-2022'), new Date('01-01-2022')],
	format = 'dd-MM-Y',
	onSubmit = jest.fn(),
	disabled = false
}: Partial<DateInputProps>) {
	render(
		<RangeDateInput
			date={date}
			format={format}
			onSubmit={onSubmit}
			disabled={disabled}
		/>
	)
}

describe('RangeDateInput', () => {
	it('RangeDateInput to be in the document', () => {
		setup({})

		expect(screen.getByTestId('range')).toBeInTheDocument()
	})

	it('RangeDateInput should contains two inputs', () => {
		setup({})

		const inputs = screen.getAllByRole('textbox')

		expect(inputs).toHaveLength(2)
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

	it('On change value on "02-01-2022" in second input and press Enter, onSubmit should be called with ["02-01-2022"(as Date), "01-01-2022"(as Date)], "enterKey"', () => {
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
})
