import ColoredConsoleLogTemplates from 'utils/colors'

ColoredConsoleLogTemplates.todo('Rewrite tests for Filter/FilterLine (#77)')

describe('Filter/FilterLine', () => {
	it('-', () => {
		expect(true).toBe(true)
	})
})

// import React, { Ref, RefCallback } from 'react'
// import { screen, render } from '@testing-library/react'
// import '@testing-library/jest-dom'
// import FilterLine from './FilterLine'
// import { FilterLineProps } from './FilterLine.interfaces'
// import { Filter } from 'data/filters.interfaces'
// import { CurrentFiltersItem } from '../../Filter.interfaces'
// import { FilterAddingButtonProps } from '../FilterAddingButton/FilterAddingButton.interfaces'
// import { FilterItemButtonProps } from '../FilterItemButton/FilterItemButton.interfaces'

// type MockFilterAddingButtonProps = { onClick: () => void }
// type MockFilterItemButtonProps = { onClick: () => void; onClose: () => void }
// let mockFilterAddingButtonProps: MockFilterAddingButtonProps = {
// 	onClick: jest.fn()
// }
// let mockFilterItemButtonProps: Record<string, MockFilterItemButtonProps> = {}

// jest.mock('../../components', () => {
// 	const React = require('react')

// 	/* eslint-disable-next-line react/display-name */
// 	const MockFilterAddingButton = React.forwardRef(
// 		(props: FilterAddingButtonProps, ref: Ref<HTMLButtonElement>) => {
// 			mockFilterAddingButtonProps = { ...props }

// 			return (
// 				<button ref={ref} data-testid='add-button'>
// 					add-button
// 				</button>
// 			)
// 		}
// 	)

// 	/* eslint-disable-next-line react/display-name */
// 	const MockFilterItemButton = React.forwardRef(
// 		(
// 			{ id, ...props }: FilterItemButtonProps,
// 			ref: RefCallback<HTMLDivElement>
// 		) => {
// 			mockFilterItemButtonProps = {
// 				...mockFilterItemButtonProps,
// 				[id]: { ...props }
// 			}

// 			return (
// 				<div ref={ref} data-testid='item-button'>
// 					item-button
// 				</div>
// 			)
// 		}
// 	)

// 	return {
// 		FilterAddingButton: MockFilterAddingButton,
// 		FilterItemButton: MockFilterItemButton
// 	}
// })

// const ALL_FILTERS = [
// 	{
// 		id: 0,
// 		label: 'first',
// 		type: 'date',
// 		standartFiltrations: {
// 			is: () => 'is',
// 			'is before': () => 'is before',
// 			'is after': () => 'is after'
// 		},

// 		specicalFiltrations: {
// 			'is within': {
// 				type: 'two',
// 				getResult: () => 'is within'
// 			}
// 		}
// 	},
// 	{
// 		id: 1,
// 		label: 'second',
// 		type: 'date',
// 		standartFiltrations: {
// 			is: () => 'is',
// 			'is before': () => 'is before'
// 		}
// 	},
// 	{
// 		id: 2,
// 		label: 'three',
// 		type: 'date',
// 		standartFiltrations: {
// 			is: () => 'is'
// 		}
// 	}
// ] as Filter[]

// const twoCurrentFilters = [
// 	{
// 		id: 0,
// 		name: 'first',
// 		key: 'is',
// 		value: new Date('01-01-2022')
// 	},
// 	{
// 		id: 1,
// 		name: 'second',
// 		key: 'is be',
// 		value: new Date('01-03-2022')
// 	}
// ] as CurrentFiltersItem[]

// const threeCurrentFilters = [
// 	{
// 		id: 0,
// 		name: 'first',
// 		key: 'is',
// 		value: new Date('01-01-2022')
// 	},
// 	{
// 		id: 1,
// 		name: 'second',
// 		key: 'is be',
// 		value: new Date('01-03-2022')
// 	},
// 	{
// 		id: 2,
// 		name: 'three',
// 		key: 'is',
// 		value: new Date('02-02-2022')
// 	}
// ] as CurrentFiltersItem[]

// const setup = ({
// 	allFilters = ALL_FILTERS,
// 	currentFilters = [],
// 	onAddClick = jest.fn(),
// 	onItemClick = jest.fn(),
// 	onItemDeleteClick = jest.fn(),
// 	customAttributes = {}
// }: Partial<FilterLineProps> & {
// 	customAttributes?: Record<string, string>
// } = {}) => {
// 	mockFilterAddingButtonProps = { onClick: jest.fn() }
// 	mockFilterItemButtonProps = {}

// 	render(
// 		<FilterLine
// 			allFilters={allFilters}
// 			currentFilters={currentFilters}
// 			onAddClick={onAddClick}
// 			onItemClick={onItemClick}
// 			onItemDeleteClick={onItemDeleteClick}
// 			{...customAttributes}
// 		/>
// 	)
// }

// describe('FilterLine', () => {
// 	beforeEach(() => {
// 		jest.resetModules()
// 	})

// 	describe('With currentItems = []', () => {
// 		let onAddClick = jest.fn()

// 		beforeEach(() => {
// 			onAddClick = jest.fn()

// 			setup({ onAddClick: onAddClick })
// 		})

// 		it('"add-button" should be in the html', () => {
// 			const addButton = screen.getByTestId('add-button')

// 			expect(addButton).toBeInTheDocument()
// 		})

// 		it('Onclick on "add-button" onAddClick should be called with ref = "add-button"', () => {
// 			const addButton = screen.getByTestId('add-button')

// 			expect(onAddClick).not.toBeCalled()

// 			mockFilterAddingButtonProps?.onClick()
// 			expect(onAddClick).toBeCalledWith(addButton)
// 		})

// 		it('"item-button" should NOT be in the html', () => {
// 			const itemButton = screen.queryByTestId('item-button')

// 			expect(itemButton).not.toBeInTheDocument()
// 		})
// 	})

// 	describe(`With currentFilters(2 items) = ${JSON.stringify(
// 		twoCurrentFilters
// 	)}`, () => {
// 		let onAddClick = jest.fn()
// 		let onItemClick = jest.fn()
// 		let onItemDeleteClick = jest.fn()

// 		beforeEach(() => {
// 			onAddClick = jest.fn()
// 			onItemClick = jest.fn()

// 			setup({
// 				currentFilters: twoCurrentFilters,
// 				onAddClick: onAddClick,
// 				onItemClick: onItemClick,
// 				onItemDeleteClick: onItemDeleteClick
// 			})
// 		})

// 		it('"add-button" should be in the html', () => {
// 			const addButton = screen.getByTestId('add-button')

// 			expect(addButton).toBeInTheDocument()
// 		})

// 		it('Onclick on "add-button" onAddClick should be called with ref = "add-button"', () => {
// 			const addButton = screen.getByTestId('add-button')

// 			expect(onAddClick).not.toBeCalled()

// 			mockFilterAddingButtonProps?.onClick()
// 			expect(onAddClick).toBeCalledWith(addButton)
// 		})

// 		it('Two "item-button" should be in the html', () => {
// 			const itemButtons = screen.getAllByTestId('item-button')

// 			expect(itemButtons).toHaveLength(2)
// 		})

// 		describe('first', () => {
// 			it('First "item-button" should be called with {name: "first", filterKey: "is", value: Date("01-01-2022")}', () => {
// 				expect(mockFilterItemButtonProps[0]).toMatchObject({
// 					name: 'first',
// 					filterKey: 'is',
// 					value: new Date('01-01-2022')
// 				})
// 			})

// 			it('After call onClick on first "item-button", onItemClick should be called with "item-button" element', () => {
// 				const itemButton = screen.getAllByTestId('item-button')[0]

// 				expect(onItemClick).not.toBeCalled()

// 				mockFilterItemButtonProps[0].onClick()

// 				expect(onItemClick).toBeCalledWith(0, itemButton)
// 			})

// 			it('After call onClose on first "item-button", onItemClick should be called with "item-button" element', () => {
// 				expect(onItemDeleteClick).not.toBeCalled()

// 				mockFilterItemButtonProps[0].onClose()

// 				expect(onItemDeleteClick).toBeCalledWith(0)
// 			})
// 		})

// 		describe('second', () => {
// 			it('Second "item-button" should be called with {name: "second", filterKey: "is be", value: Date("01-03-2022")}', () => {
// 				expect(mockFilterItemButtonProps[1]).toMatchObject({
// 					name: 'second',
// 					filterKey: 'is be',
// 					value: new Date('01-03-2022')
// 				})
// 			})

// 			it('After call onClick on second "item-button", onItemClick should be called with "item-button" element', () => {
// 				const itemButton = screen.getAllByTestId('item-button')[1]

// 				expect(onItemClick).not.toBeCalled()

// 				mockFilterItemButtonProps[1].onClick()

// 				expect(onItemClick).toBeCalledWith(1, itemButton)
// 			})

// 			it('After call onClose on second "item-button", onItemClick should be called with "item-button" element', () => {
// 				expect(onItemDeleteClick).not.toBeCalled()

// 				mockFilterItemButtonProps[1].onClose()

// 				expect(onItemDeleteClick).toBeCalledWith(1)
// 			})
// 		})
// 	})

// 	describe(`With currentFilters(3 items) = ${JSON.stringify(
// 		threeCurrentFilters
// 	)}`, () => {
// 		let onItemClick = jest.fn()
// 		let onItemDeleteClick = jest.fn()

// 		beforeEach(() => {
// 			setup({
// 				currentFilters: threeCurrentFilters,
// 				onItemClick: onItemClick,
// 				onItemDeleteClick: onItemDeleteClick
// 			})
// 		})

// 		it('"add-button" should NOT be in the html', () => {
// 			const addButton = screen.queryByTestId('add-button')

// 			expect(addButton).not.toBeInTheDocument()
// 		})

// 		it('Three "item-button" should be in the html', () => {
// 			const itemButtons = screen.getAllByTestId('item-button')

// 			expect(itemButtons).toHaveLength(3)
// 		})

// 		describe('first', () => {
// 			it('First "item-button" should be called with {name: "first", filterKey: "is", value: Date("01-01-2022")}', () => {
// 				expect(mockFilterItemButtonProps[0]).toMatchObject({
// 					name: 'first',
// 					filterKey: 'is',
// 					value: new Date('01-01-2022')
// 				})
// 			})

// 			it('After call onClick on first "item-button", onItemClick should be called with "item-button" element', () => {
// 				const itemButton = screen.getAllByTestId('item-button')[0]

// 				expect(onItemClick).not.toBeCalled()

// 				mockFilterItemButtonProps[0].onClick()

// 				expect(onItemClick).toBeCalledWith(0, itemButton)
// 			})

// 			it('After call onClose on first "item-button", onItemClick should be called with "item-button" element', () => {
// 				expect(onItemDeleteClick).not.toBeCalled()

// 				mockFilterItemButtonProps[0].onClose()

// 				expect(onItemDeleteClick).toBeCalledWith(0)
// 			})
// 		})

// 		describe('second', () => {
// 			it('Second "item-button" should be called with {name: "second", filterKey: "is be", value: Date("01-03-2022")}', () => {
// 				expect(mockFilterItemButtonProps[1]).toMatchObject({
// 					name: 'second',
// 					filterKey: 'is be',
// 					value: new Date('01-03-2022')
// 				})
// 			})

// 			it('After call onClick on second "item-button", onItemClick should be called with "item-button" element', () => {
// 				const itemButton = screen.getAllByTestId('item-button')[1]

// 				expect(onItemClick).not.toBeCalled()

// 				mockFilterItemButtonProps[1].onClick()

// 				expect(onItemClick).toBeCalledWith(1, itemButton)
// 			})

// 			it('After call onClose on second "item-button", onItemClick should be called with "item-button" element', () => {
// 				expect(onItemDeleteClick).not.toBeCalled()

// 				mockFilterItemButtonProps[1].onClose()

// 				expect(onItemDeleteClick).toBeCalledWith(1)
// 			})
// 		})

// 		describe('third', () => {
// 			it('Third "item-button" should be called with {name: "three", filterKey: "is", value: Date("02-02-2022")}', () => {
// 				expect(mockFilterItemButtonProps[2]).toMatchObject({
// 					name: 'three',
// 					filterKey: 'is',
// 					value: new Date('02-02-2022')
// 				})
// 			})

// 			it('After call onClick on third "item-button", onItemClick should be called with "item-button" element', () => {
// 				const itemButton = screen.getAllByTestId('item-button')[2]

// 				expect(onItemClick).not.toBeCalled()

// 				mockFilterItemButtonProps[2].onClick()

// 				expect(onItemClick).toBeCalledWith(2, itemButton)
// 			})

// 			it('After call onClose on third "item-button", onItemClick should be called with "item-button" element', () => {
// 				expect(onItemDeleteClick).not.toBeCalled()

// 				mockFilterItemButtonProps[2].onClose()

// 				expect(onItemDeleteClick).toBeCalledWith(2)
// 			})
// 		})
// 	})

// 	describe('data-hello="1"', () => {
// 		it('data-hello="1" with currentFilters = [] shoult NOT be in the document', () => {
// 			setup({
// 				customAttributes: { 'data-hello': '1' }
// 			})

// 			const helloAttribute = document.querySelector('[data-hello]')

// 			expect(helloAttribute).not.toBeInTheDocument()
// 		})

// 		it('data-hello="1" with currentFilters = (1+ element) shoult NOT be in the document', () => {
// 			setup({
// 				customAttributes: { 'data-hello': '1' },
// 				currentFilters: twoCurrentFilters
// 			})

// 			const helloAttribute = document.querySelector('[data-hello]')

// 			expect(helloAttribute).toBeInTheDocument()
// 		})
// 	})
// })
