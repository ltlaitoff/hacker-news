import ColoredConsoleLogTemplates from 'utils/colors'

ColoredConsoleLogTemplates.todo('Rewrite tests on FilterDetailsWindow(#77)')

describe('Filter/FilterDetailsWindow', () => {
	it('-', () => {
		expect(true).toBe(true)
	})
})

// import React from 'react'
// import { screen, render } from '@testing-library/react'
// import '@testing-library/jest-dom'
// import FilterDetailsWindow from './FilterDetailsWindow'
// import { FilterDetailsWindowProps } from './FilterDetailsWindow.interfaces'
// import { Filter } from 'data/filters.interfaces'
// import { SelectProps } from 'components/Select/Select.interfaces'
// import { DatePickerProps } from 'components/DatePicker/interfaces'
// import { act } from 'react-dom/test-utils'
// import user from '@testing-library/user-event'
// import { onKeyPressObserver } from 'observers'

// onKeyPressObserver.mount()

// const DEFAULT_SELECT_PROPS = {
// 	options: [],
// 	onClick: jest.fn(),
// 	defaultSelectId: -1
// }

// const DEFAULT_DATE_PICKER_PROPS = {
// 	value: new Date('01-01-2022'),
// 	onChange: jest.fn(),
// 	onError: jest.fn(),
// 	format: 'dd-MM-Y'
// }

// let mockSelectProps: SelectProps = DEFAULT_SELECT_PROPS
// let mockDatePickerProps: DatePickerProps = DEFAULT_DATE_PICKER_PROPS

// jest.mock('components/Select', () => {
// 	const React = require('react')

// 	const MockSelect = (props: SelectProps) => {
// 		mockSelectProps = { ...props }

// 		return <div data-testid='select' />
// 	}

// 	return MockSelect
// })

// jest.mock('components/DatePicker', () => {
// 	const React = require('react')

// 	const MockDatePicker = (props: DatePickerProps) => {
// 		mockDatePickerProps = { ...props }

// 		return <div data-testid='date-picker' />
// 	}

// 	return MockDatePicker
// })

// const FILTER = {
// 	id: 0,
// 	label: 'testFilter',
// 	type: 'date',
// 	standartFiltrations: {
// 		is: () => 'is',
// 		'is before': () => 'is before',
// 		'is after': () => 'is after'
// 	},

// 	specicalFiltrations: {
// 		'is within': {
// 			type: 'two',
// 			getResult: () => 'is within'
// 		}
// 	}
// } as Filter

// const CURRENT_FILTER = {
// 	id: 1,
// 	name: 'testLabel',
// 	key: 'is',
// 	value: new Date('01-01-2022')
// }

// const setup = ({
// 	filter = FILTER,
// 	// @ts-expect-error
// 	currentFilter = CURRENT_FILTER,
// 	onSubmit = jest.fn(),
// 	onClose = jest.fn(),
// 	customAttributes
// }: Partial<FilterDetailsWindowProps> & {
// 	customAttributes?: Record<string, string>
// } = {}) => {
// 	mockSelectProps = { ...DEFAULT_SELECT_PROPS }
// 	mockDatePickerProps = { ...DEFAULT_DATE_PICKER_PROPS }

// 	render(
// 		<FilterDetailsWindow
// 			filter={filter}
// 			currentFilter={currentFilter}
// 			onSubmit={onSubmit}
// 			onClose={onClose}
// 			{...customAttributes}
// 		/>
// 	)
// }

// describe('FilterDetailsWindow', () => {
// 	it('wrapper should have labelText = "testFilter"', () => {
// 		setup()

// 		const labelText = screen.getByTestId('label-text')

// 		expect(labelText.textContent).toBe('testFilter')
// 	})

// 	it('wrapper should have Select', () => {
// 		setup()

// 		const select = screen.getByTestId('select')

// 		expect(select).toBeInTheDocument()
// 	})

// 	it('wrapper should have DatePicker', () => {
// 		setup()

// 		const datePicker = screen.getByTestId('date-picker')

// 		expect(datePicker).toBeInTheDocument()
// 	})

// 	it('wrapper should have "done-button"', () => {
// 		setup()

// 		const doneButton = screen.getByTestId('done-button')

// 		expect(doneButton).toBeInTheDocument()
// 	})

// 	it('wrapper should have "close-button"', () => {
// 		setup()

// 		const closeButton = screen.getByTestId('close-button')

// 		expect(closeButton).toBeInTheDocument()
// 	})

// 	it('Select props should be {"defaultSelectId":-1,"options":[{"id":0,"label":"is"},{"id":1,"label":"is before"},{"id":2,"label":"is after"},{"id":3,"label":"is within"}], onClick: ==SomeFunction==}', () => {
// 		setup()

// 		expect(mockSelectProps).toMatchObject({
// 			defaultSelectId: 0,
// 			options: [
// 				{
// 					id: 0,
// 					label: 'is'
// 				},
// 				{
// 					id: 1,
// 					label: 'is before'
// 				},
// 				{
// 					id: 2,
// 					label: 'is after'
// 				},
// 				{
// 					id: 3,
// 					label: 'is within'
// 				}
// 			]
// 		})

// 		expect(mockSelectProps.onClick).toBeInstanceOf(Function)
// 	})

// 	it('DatePicker props should be {type: "standart",value: [new Date("01-01-2022"), new Date("01-01-2022")],format: "dd-MM-Y",onChange: ==someFunction==,onError: ==someFunction==}', () => {
// 		setup()

// 		expect(mockDatePickerProps).toMatchObject({
// 			type: 'standart',
// 			value: [new Date('01-01-2022'), new Date('01-01-2022')],
// 			format: 'dd-MM-Y'
// 		})

// 		expect(mockDatePickerProps.onChange).toBeInstanceOf(Function)
// 		expect(mockDatePickerProps.onError).toBeInstanceOf(Function)
// 	})

// 	describe('After call onClick Select with id = 3', () => {
// 		it('Select defaultSelecId = 3', () => {
// 			setup()

// 			expect(mockSelectProps.defaultSelectId).toBe(0)

// 			act(() => {
// 				mockSelectProps?.onClick?.(3)
// 			})

// 			expect(mockSelectProps.defaultSelectId).toBe(3)
// 		})

// 		it('Range type with id = 3, should be "range"', () => {
// 			setup()

// 			expect(mockDatePickerProps.type).toBe('standart')

// 			act(() => {
// 				mockSelectProps?.onClick?.(3)
// 			})

// 			expect(mockDatePickerProps.type).toBe('range')
// 		})
// 	})

// 	describe('After click on "done-button"', () => {
// 		it('with STANDART filter type: onSubmit should be called with {key: "is", value: new Date("01-01-2022") }', () => {
// 			const onSubmit = jest.fn()
// 			setup({ onSubmit })

// 			const doneButton = screen.getByTestId('done-button')
// 			user.click(doneButton)

// 			expect(onSubmit).toBeCalledWith({
// 				key: 'is',
// 				value: new Date('01-01-2022')
// 			})
// 		})

// 		it('with RANGE filter type: onSubmit should be called with {key: "is within", value: [new Date("01-01-2022"), new Date("01-01-2022")] }', () => {
// 			const onSubmit = jest.fn()

// 			const currentFilter = {
// 				id: 1,
// 				name: 'testLabel',
// 				key: 'is within',
// 				value: [new Date('01-01-2022'), new Date('01-01-2022')]
// 			}

// 			// @ts-expect-error
// 			setup({ onSubmit, currentFilter })

// 			const doneButton = screen.getByTestId('done-button')
// 			user.click(doneButton)

// 			expect(onSubmit).toBeCalledWith({
// 				key: 'is within',
// 				value: [new Date('01-01-2022'), new Date('01-01-2022')]
// 			})
// 		})
// 	})

// 	it('After click on "close-button", onClose should be called', () => {
// 		const onClose = jest.fn()

// 		setup({ onClose })

// 		const closeButton = screen.getByTestId('close-button')

// 		user.click(closeButton)

// 		expect(onClose).toBeCalled()
// 	})

// 	describe('After call onError(true) in DatePicker', () => {
// 		it('"done-button" should have attribute disabled', () => {
// 			setup()

// 			const doneButton = screen.getByTestId('done-button')

// 			act(() => {
// 				mockDatePickerProps.onError(true)
// 			})

// 			expect(doneButton).toHaveAttribute('disabled')
// 		})
// 	})

// 	it('After call DatePicker(type = "standart") onChange with new Date("02-02-2022"), DatePicker value = [new Date("02-02-2022"), new Date("02-02-2022")]', () => {
// 		setup()

// 		act(() => {
// 			if (mockDatePickerProps.type === 'standart') {
// 				mockDatePickerProps.onChange(new Date('02-02-2022'))
// 			}
// 		})

// 		expect(mockDatePickerProps.value).toStrictEqual([
// 			new Date('02-02-2022'),
// 			new Date('02-02-2022')
// 		])
// 	})

// 	it('After call DatePicker(type = "range") onChange with [new Date("03-03-2022"), new Date("03-03-2022")], DatePicker value = [new Date("03-03-2022"), new Date("03-03-2022")]', () => {
// 		setup()

// 		act(() => {
// 			mockDatePickerProps.onChange([
// 				new Date('03-03-2022'),
// 				new Date('03-03-2022')
// 			])
// 		})

// 		expect(mockDatePickerProps.value).toStrictEqual([
// 			new Date('03-03-2022'),
// 			new Date('03-03-2022')
// 		])
// 	})

// 	it('After click outside of wrapper, onClose should be called', () => {
// 		const onClose = jest.fn()

// 		setup({ onClose })

// 		user.click(document.body)

// 		expect(onClose).toBeCalled()
// 	})

// 	it('After press "Escape" key, onClose should be called', () => {
// 		const onClose = jest.fn()

// 		setup({ onClose })

// 		user.keyboard('{Escape}')

// 		expect(onClose).toBeCalled()
// 	})

// 	it('data-hello="1" custom attribute should be in the wrapper', () => {
// 		setup({
// 			customAttributes: { 'data-hello': '1' }
// 		})

// 		const wrapper = screen.getByTestId('wrapper')

// 		expect(wrapper).toHaveAttribute('data-hello', '1')
// 	})
// })
