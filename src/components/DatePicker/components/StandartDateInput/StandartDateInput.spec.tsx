import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import StandartDateInput from './StandartDateInput'
import { DateInputProps } from '../../interfaces'

function setup({
	date = [new Date('01-01-2022'), new Date('01-01-2022')],
	format = 'dd-MM-Y',
	onSubmit = jest.fn(),
	disabled = false
}: Partial<DateInputProps>) {
	render(
		<StandartDateInput
			date={date}
			format={format}
			onSubmit={onSubmit}
			disabled={disabled}
		/>
	)
}

describe('StandartDateInput', () => {
	it('StandartDateInput to be in the document', () => {
		setup({})

		expect(screen.getByTestId('input')).toBeInTheDocument()
	})

	it('On change value on "02-01-2022" in input and press Enter, onSubmit should be called with ["02-01-2022"(as Date), "02-01-2022"(as Date)], "enterKey"', () => {
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
})
