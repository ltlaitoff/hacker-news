import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DatePicker from './DatePicker'
import { DatePickerProps, DatePickerTypes } from './DatePicker.interfaces'
import { onKeyPressObserver } from 'observers'

jest.useFakeTimers().setSystemTime(new Date('01-01-2022'))

onKeyPressObserver.mount()

function setup({
	type = DatePickerTypes.STANDART,
	value = new Date('01-01-2022'),
	onChange = jest.fn(),
	onError = jest.fn(),
	error = false,
	disabled = false,
	format = 'dd-MM-Y',
	...args
}: Partial<DatePickerProps> = {}) {
	render(
		// @ts-expect-error
		<DatePicker
			type={type}
			value={value}
			onChange={onChange}
			onError={onError}
			error={error}
			format={format}
			disabled={disabled}
			{...args}
		/>
	)
}

describe('DatePicker', () => {
	it('DatePicker should be in the document', () => {
		setup()

		const picker = screen.getByTestId('picker')
		expect(picker).toBeInTheDocument()
	})

	it('DatePicker with type = “standart” should have 1 input', () => {
		setup({ type: DatePickerTypes.STANDART })

		const inputs = screen.getAllByRole('textbox')
		expect(inputs).toHaveLength(1)
	})

	it('DatePicker with type = undefined should have 1 input (check on standart type by default)', () => {
		setup({ type: undefined })

		const inputs = screen.getAllByRole('textbox')
		expect(inputs).toHaveLength(1)
	})

	it('DatePicker with type = “range” should have 2 inputs', () => {
		setup({
			type: DatePickerTypes.RANGE,
			value: [new Date('01-01-2022'), new Date('01-01-2022')]
		})

		const inputs = screen.getAllByRole('textbox')
		expect(inputs).toHaveLength(2)
	})

	it('On click on ‘picker’ calendar should seem', () => {
		setup()

		const picker = screen.getByTestId('picker')

		expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

		user.click(picker)

		expect(screen.getByTestId('calendar')).toBeInTheDocument()
	})

	it('On click on ‘picker’ and press Esc key - calendar should hide', () => {
		setup()

		const picker = screen.getByTestId('picker')
		expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

		user.click(picker)
		expect(screen.getByTestId('calendar')).toBeInTheDocument()

		user.keyboard('{Escape}')
		expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
	})

	it('On click on ‘picker’ and click outside of block - calendar should hide', () => {
		setup()

		const picker = screen.getByTestId('picker')
		expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

		user.click(picker)
		expect(screen.getByTestId('calendar')).toBeInTheDocument()

		user.click(document.body)
		expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
	})

	describe.each`
		date                      | newDate         | newDateAsDate
		${new Date('01-01-2022')} | ${'02-01-2022'} | ${new Date('01-02-2022')}
		${new Date('05-15-2022')} | ${'30-05-2022'} | ${new Date('05-30-2022')}
	`('Standart type', ({ date, newDate, newDateAsDate }) => {
		it('With value = $date, after type newDate = $newDate in input and press enter key - onChange should be called with ($newDateAsDate, "enterKey"), calendar should hide', () => {
			const onChange = jest.fn()
			setup({
				value: date,
				onChange: onChange,
				type: DatePickerTypes.STANDART
			})

			const input = screen.getByTestId('standart-input')
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

			user.clear(input)
			user.type(input, newDate)

			expect(screen.getByTestId('calendar')).toBeInTheDocument()

			user.type(input, '{Enter}')
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
			expect(onChange).toBeCalledWith(newDateAsDate, 'enterKey')
		})

		it('With value = [$date, $date], after type newDate = $newDate in input and press enter key - onChange should be called with ([$newDateAsDate, $newDateAsDate], "enterKey"), calendar should hide', () => {
			const onChange = jest.fn()
			setup({
				value: [date, date],
				onChange: onChange,
				type: DatePickerTypes.STANDART
			})

			const input = screen.getByTestId('standart-input')
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

			user.clear(input)
			user.type(input, newDate)

			expect(screen.getByTestId('calendar')).toBeInTheDocument()

			user.type(input, '{Enter}')
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
			expect(onChange).toBeCalledWith(
				[newDateAsDate, newDateAsDate],
				'enterKey'
			)
		})

		it('With value = $date, after type newDate = "invalid" in input and press enter key - onError should be called with true', () => {
			const onError = jest.fn()
			setup({
				value: date,
				onError,
				type: DatePickerTypes.STANDART
			})

			const input = screen.getByTestId('standart-input')
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

			user.clear(input)
			user.type(input, 'invalid')

			expect(screen.getByTestId('calendar')).toBeInTheDocument()

			user.type(input, '{Enter}')
			expect(screen.getByTestId('calendar')).toBeInTheDocument()
			expect(onError).toBeCalledWith(true)
		})
	})

	describe('Range type', () => {
		it.each`
			date                      | newDate         | newDateAsDate
			${new Date('01-15-2022')} | ${'02-01-2022'} | ${new Date('01-02-2022')}
			${new Date('05-15-2022')} | ${'10-05-2022'} | ${new Date('05-10-2022')}
		`(
			'With value = [$date, $date], after type newDate = $newDate in first input and press enter key - onChange should be called with ([$newDateAsDate, $date], "enterKey"), calendar should hide',
			({ date, newDate, newDateAsDate }) => {
				const onChange = jest.fn()

				setup({
					value: [date, date],
					onChange: onChange,
					type: DatePickerTypes.RANGE
				})

				const input = screen.getAllByRole('textbox')[0]
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

				user.clear(input)
				user.type(input, newDate)

				expect(screen.getByTestId('calendar')).toBeInTheDocument()

				user.type(input, '{Enter}')
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
				expect(onChange).toBeCalledWith([newDateAsDate, date], 'enterKey')
			}
		)

		it.each`
			date                      | newDate         | newDateAsDate
			${new Date('01-01-2022')} | ${'15-01-2022'} | ${new Date('01-15-2022')}
			${new Date('05-15-2022')} | ${'30-05-2022'} | ${new Date('05-30-2022')}
		`(
			'With value = [$date, $date], after type newDate = $newDate in second input and press enter key - onChange should be called with ([$newDateAsDate, $date], "enterKey"), calendar should hide',
			({ date, newDate, newDateAsDate }) => {
				const onChange = jest.fn()

				setup({
					value: [date, date],
					onChange: onChange,
					type: DatePickerTypes.RANGE
				})

				const input = screen.getAllByRole('textbox')[1]
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

				user.clear(input)
				user.type(input, newDate)

				expect(screen.getByTestId('calendar')).toBeInTheDocument()

				user.type(input, '{Enter}')
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
				expect(onChange).toBeCalledWith([date, newDateAsDate], 'enterKey')
			}
		)

		it.each`
			date                      | newDate         | newDateAsDate
			${new Date('01-01-2022')} | ${'15-01-2022'} | ${new Date('01-15-2022')}
			${new Date('01-20-2022')} | ${'25-01-2022'} | ${new Date('01-25-2022')}
		`(
			'With value = [$date, $date], after type newDate = $newDate in first input and press enter key - onChange(first param Date ≤ second param Date) should be called with ([$date, $newDateAsDate], "enterKey"), calendar should hide',
			({ date, newDate, newDateAsDate }) => {
				const onChange = jest.fn()

				setup({
					value: [date, date],
					onChange: onChange,
					type: DatePickerTypes.RANGE
				})

				const input = screen.getAllByRole('textbox')[0]
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

				user.clear(input)
				user.type(input, newDate)

				expect(screen.getByTestId('calendar')).toBeInTheDocument()

				user.type(input, '{Enter}')
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
				expect(onChange).toBeCalledWith([date, newDateAsDate], 'enterKey')
			}
		)

		it.each`
			date                      | newDate         | newDateAsDate
			${new Date('01-15-2022')} | ${'01-01-2022'} | ${new Date('01-01-2022')}
			${new Date('01-25-2022')} | ${'02-01-2022'} | ${new Date('01-02-2022')}
		`(
			'With value = [$date, $date], after type newDate = $newDate in second input and press enter key - onChange(first param Date ≤ second param Date) should be called with ([$newDateAsDate, $date], "enterKey"), calendar should hide',
			({ date, newDate, newDateAsDate }) => {
				const onChange = jest.fn()

				setup({
					value: [date, date],
					onChange: onChange,
					type: DatePickerTypes.RANGE
				})

				const input = screen.getAllByRole('textbox')[1]
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

				user.clear(input)
				user.type(input, newDate)

				expect(screen.getByTestId('calendar')).toBeInTheDocument()

				user.type(input, '{Enter}')
				expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
				expect(onChange).toBeCalledWith([newDateAsDate, date], 'enterKey')
			}
		)

		it(`With value = ${new Date(
			'01-01-2022'
		)}, after type newDate = "invalid" in first input and press enter key - onError should be called with true`, () => {
			const onError = jest.fn()
			setup({
				value: [new Date('01-01-2022'), new Date('01-01-2022')],
				onError,
				type: DatePickerTypes.RANGE
			})

			const input = screen.getAllByRole('textbox')[0]
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

			user.clear(input)
			user.type(input, 'invalid')

			expect(screen.getByTestId('calendar')).toBeInTheDocument()

			user.type(input, '{Enter}')
			expect(screen.getByTestId('calendar')).toBeInTheDocument()
			expect(onError).toBeCalledWith(true)
		})

		it(`With value = ${new Date(
			'01-01-2022'
		)}, after type newDate = "invalid" in second input and press enter key - onError should be called with true`, () => {
			const onError = jest.fn()
			setup({
				value: [new Date('01-01-2022'), new Date('01-01-2022')],
				onError,
				type: DatePickerTypes.RANGE
			})

			const input = screen.getAllByRole('textbox')[1]
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

			user.clear(input)
			user.type(input, 'invalid')

			expect(screen.getByTestId('calendar')).toBeInTheDocument()

			user.type(input, '{Enter}')
			expect(screen.getByTestId('calendar')).toBeInTheDocument()
			expect(onError).toBeCalledWith(true)
		})
	})

	describe('With disabled = true', () => {
		it('On click on ‘picker’ calendar should not seem', () => {
			setup({ disabled: true })

			const picker = screen.getByTestId('picker')
			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()

			user.click(picker)

			expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
		})

		describe('Standart type', () => {
			it('Input should have disabled attribute', () => {
				setup({ disabled: true })

				const input = screen.getByTestId('standart-input')

				expect(input).toHaveAttribute('disabled')
			})

			it('if user try to type something and press Enter - onChange should be not called', () => {
				const onChange = jest.fn()
				setup({ disabled: true, onChange: onChange })

				const input = screen.getByTestId('standart-input')

				user.type(input, 'test{Enter}')

				expect(onChange).not.toBeCalled()
			})
		})

		describe('Range type', () => {
			it('Both inputs should have attribute disabled', () => {
				setup({ disabled: true, type: DatePickerTypes.RANGE })

				const inputs = screen.getAllByRole('textbox')

				expect(inputs[0]).toHaveAttribute('disabled')
				expect(inputs[1]).toHaveAttribute('disabled')
			})

			it('If user try to type something in first input and press Enter - onChange should be not called', () => {
				const onChange = jest.fn()
				setup({
					type: DatePickerTypes.RANGE,
					disabled: true,
					onChange: onChange
				})

				const inputs = screen.getAllByRole('textbox')

				user.type(inputs[0], 'test{Enter}')

				expect(onChange).not.toBeCalled()
			})

			it('If user try to type something in second input and press Enter - onChange should be not called', () => {
				const onChange = jest.fn()
				setup({
					type: DatePickerTypes.RANGE,
					disabled: true,
					onChange: onChange
				})

				const inputs = screen.getAllByRole('textbox')

				user.type(inputs[1], 'test{Enter}')

				expect(onChange).not.toBeCalled()
			})
		})
	})

	describe('With date prop = null', () => {
		it('With type = "standart" input should have value = Date.now()(After mock - "01-01-2022")', () => {
			setup({ type: DatePickerTypes.STANDART })

			const input = screen.getByTestId('standart-input')
			expect(input).toHaveValue('01-01-2022')
		})

		it('With type = "range" both inputs should have value = Date.now()(After mock - "01-01-2022")', () => {
			setup({ type: DatePickerTypes.RANGE })

			const inputs = screen.getAllByRole('textbox')
			expect(inputs[0]).toHaveValue('01-01-2022')
			expect(inputs[1]).toHaveValue('01-01-2022')
		})
	})

	it('test-arg="test" custom attribute should be in outer html', () => {
		// @ts-expect-error
		setup({ 'test-arg': 'test' })

		const picker = screen.getByTestId('picker')

		expect(picker).toHaveAttribute('test-arg', 'test')
	})
})
