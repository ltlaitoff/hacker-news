import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import user from '@testing-library/user-event'
import { CurrentFiltersItem, FilterProps } from './Filter.interfaces'
import Filter from './Filter'

import { Filter as FilterType } from 'data/filters.interfaces'
import { SelectListProps } from 'components/SelectList'
import { FilterLineProps } from './components/FilterLine/FilterLine.interfaces'
import { FilterDetailsWindowProps } from './components'
import { filters } from '../../../../data/filters'

const CURRENT_FILTERS = [
	{
		id: 0,
		name: 'first',
		key: 'is',
		value: new Date('01-01-2022')
	},
	{
		id: 1,
		name: 'second',
		key: 'is be',
		value: new Date('01-03-2022')
	}
] as CurrentFiltersItem[]

const FILTERS = [
	{
		id: 0,
		label: 'first',
		type: 'date',
		standartFiltrations: {
			is: () => 'is',
			'is before': () => 'is before',
			'is after': () => 'is after'
		},

		specicalFiltrations: {
			'is within': {
				type: 'two',
				getResult: () => 'is within'
			}
		}
	},
	{
		id: 1,
		label: 'second',
		type: 'date',
		standartFiltrations: {
			is: () => 'is',
			'is before': () => 'is before'
		}
	},
	{
		id: 2,
		label: 'three',
		type: 'date',
		standartFiltrations: {
			is: () => 'is'
		}
	}
] as FilterType[]

const SELECT_LIST_PROPS_DEFAULT = {
	options: [],
	onItemClick: jest.fn(),
	onOutsideClick: jest.fn()
}

const FILTER_LINE_PROPS_DEFAULT = {
	allFilters: [],
	currentFilters: [],
	onAddClick: jest.fn(),
	onItemClick: jest.fn(),
	onItemDeleteClick: jest.fn()
}

const FILTER_DETAILS_WINDOW_PROPS_DEFAULT = {
	filter: { type: 'date', id: -1, label: 'default' },
	currentFilter: {
		id: -1,
		name: 'default',
		key: 'is',
		value: new Date('01-01-2022')
	},
	onSubmit: jest.fn(),
	onClose: jest.fn()
} as FilterDetailsWindowProps

let mockSelectListProps: SelectListProps = SELECT_LIST_PROPS_DEFAULT
let mockFilterLineProps: FilterLineProps = FILTER_LINE_PROPS_DEFAULT
let mockFilterDetailsWindowProps: FilterDetailsWindowProps =
	FILTER_DETAILS_WINDOW_PROPS_DEFAULT

jest.mock('components/SelectList', () => {
	const SelectList = (props: SelectListProps) => {
		mockSelectListProps = { ...props }

		return <div data-testid='SelectList' />
	}
	return SelectList
})

jest.mock('./components', () => {
	const FilterLine = (props: FilterLineProps) => {
		mockFilterLineProps = { ...props }

		return <div data-testid='FilterLine' />
	}

	const FilterDetailsWindow = (props: FilterDetailsWindowProps) => {
		mockFilterDetailsWindowProps = { ...props }

		return <div data-testid='FilterDetailsWindow' />
	}

	return {
		FilterLine,
		FilterDetailsWindow
	}
})

const setup = ({
	filters = FILTERS,
	currentFilters = CURRENT_FILTERS,
	onChange = jest.fn(),
	customAttributes
}: Partial<FilterProps> & {
	customAttributes?: Record<string, string>
} = {}) => {
	render(
		<Filter
			filters={filters}
			currentFilters={currentFilters}
			onChange={onChange}
			{...customAttributes}
		/>
	)
}

describe('Filter', () => {
	it(`FilterLine should have props {allFilters: [${FILTERS}], currentFilters: [${CURRENT_FILTERS}], onAddClick: function, onItemClick: function, onItemDeleteClick: function}`, () => {
		setup({ filters: FILTERS, currentFilters: CURRENT_FILTERS })

		expect(mockFilterLineProps).toMatchObject({
			allFilters: FILTERS,
			currentFilters: CURRENT_FILTERS
		})

		expect(mockFilterLineProps.onAddClick).toBeInstanceOf(Function)
		expect(mockFilterLineProps.onItemClick).toBeInstanceOf(Function)
		expect(mockFilterLineProps.onItemDeleteClick).toBeInstanceOf(Function)
	})

	describe('After call FilterLine onAddClick', () => {
		it('SelectList(with left: 100, top: 100, height: 50 and window.scrollX = 50, window.scrollY = 50) should be rendered with props {"options":[{"id":2,"label":"three","type":"date","standartFiltrations":{}}],"style":{"left":150,"top":200}}', () => {
			setup()

			window.scrollX = 50
			window.scrollY = 50

			act(() => {
				mockFilterLineProps.onAddClick({
					// @ts-expect-error
					getBoundingClientRect() {
						return {
							left: 100,
							top: 100,
							height: 50
						}
					}
				})
			})

			const selectList = screen.queryByTestId('SelectList')
			expect(selectList).toBeInTheDocument()

			expect(JSON.stringify(mockSelectListProps.options)).toEqual(
				JSON.stringify([
					{
						id: 2,
						label: 'three',
						type: 'date',
						standartFiltrations: {
							is: () => {}
						}
					}
				])
			)

			expect(mockSelectListProps.style).toMatchObject({
				left: 150,
				top: 200
			})

			expect(mockSelectListProps.onItemClick).toBeInstanceOf(Function)
			expect(mockSelectListProps.onOutsideClick).toBeInstanceOf(Function)
		})

		it('After call SelectList onOutsideClick, SelectList should hide', () => {
			setup()

			act(() => {
				mockFilterLineProps.onAddClick(null)
			})

			const selectList = screen.queryByTestId('SelectList')
			expect(selectList).toBeInTheDocument()

			act(() => {
				mockFilterLineProps.onAddClick(null)
			})

			expect(selectList).not.toBeInTheDocument()
		})

		describe('After call SelectList onItemClick', () => {
			it('FilterDetailsWindow should be rendered with props {filter: {id: 2,label: "three", type: "date", standartFiltrations: { is: ==SomeFunction== }},currentFilter: null,onSubmit: ==SomeFunction==,onClose: ==SomeFunction==,style: { left: 150, top: 200 }}', () => {
				setup()

				window.scrollX = 50
				window.scrollY = 50

				act(() => {
					mockFilterLineProps.onAddClick({
						// @ts-expect-error
						getBoundingClientRect() {
							return {
								left: 100,
								top: 100,
								height: 50
							}
						}
					})
				})

				act(() => {
					mockSelectListProps.onItemClick({ id: 2, label: 'three' })
				})

				expect(mockFilterDetailsWindowProps.filter.id).toEqual(2)
				expect(mockFilterDetailsWindowProps.filter.label).toEqual('three')
				expect(mockFilterDetailsWindowProps.filter.type).toEqual('date')
				expect(
					mockFilterDetailsWindowProps.filter.standartFiltrations
				).toBeInstanceOf(Object)

				expect(mockFilterDetailsWindowProps.currentFilter).toEqual(null)
				expect(mockFilterDetailsWindowProps.onSubmit).toBeInstanceOf(Function)
				expect(mockFilterDetailsWindowProps.onClose).toBeInstanceOf(Function)
				expect(mockFilterDetailsWindowProps.style).toMatchObject({
					left: 150,
					top: 200
				})
			})

			describe('After call FilterDetailsWindow onClose', () => {
				it('FilterDetailsWindow should hide', () => {
					setup()

					window.scrollX = 50
					window.scrollY = 50

					act(() => {
						mockFilterLineProps.onAddClick(null)
					})

					act(() => {
						mockSelectListProps.onItemClick({ id: 2, label: 'three' })
					})

					const filterDetailsWindow = screen.getByTestId('FilterDetailsWindow')
					expect(filterDetailsWindow).toBeInTheDocument()

					act(() => {
						mockFilterDetailsWindowProps.onClose()
					})

					expect(filterDetailsWindow).not.toBeInTheDocument()
				})
			})

			describe('After call FilterDetailsWindow onSubmit', () => {
				it('onChange should be called with [{"id": 0, "key": "is", "name": "first", "value": 2021-12-31T22:00:00.000Z}, {"id": 1, "key": "is be", "name": "second", "value": 2022-01-02T22:00:00.000Z}, {"id": 2, "key": "is", "name": "three", "value": 2021-12-31T22:00:00.000Z}]', () => {
					const onChange = jest.fn()
					setup({ onChange })

					act(() => {
						mockFilterLineProps.onAddClick(null)
					})

					act(() => {
						mockSelectListProps.onItemClick({ id: 2, label: 'three' })
					})

					act(() => {
						mockFilterDetailsWindowProps.onSubmit({
							key: 'is',
							value: new Date('01-01-2022')
						})
					})

					expect(onChange).toBeCalledWith([
						{ id: 0, key: 'is', name: 'first', value: new Date('01-01-2022') },
						{
							id: 1,
							key: 'is be',
							name: 'second',
							value: new Date('01-03-2022')
						},
						{ id: 2, key: 'is', name: 'three', value: new Date('01-01-2022') }
					])
				})

				it('FilterDetailsWindow should hide', () => {
					const onChange = jest.fn()
					setup({ onChange })

					act(() => {
						mockFilterLineProps.onAddClick(null)
					})

					act(() => {
						mockSelectListProps.onItemClick({ id: 2, label: 'three' })
					})

					const filterDetailsWindow = screen.getByTestId('FilterDetailsWindow')
					expect(filterDetailsWindow).toBeInTheDocument()

					act(() => {
						mockFilterDetailsWindowProps.onSubmit({
							key: 'is',
							value: new Date('01-01-2022')
						})
					})

					expect(filterDetailsWindow).not.toBeInTheDocument()
				})
			})
		})
	})

	describe('After call FilterLine onItemClick', () => {
		it('FilterDetailsWindow should be rendered with props {filter: {id: 2,label: "three", type: "date", standartFiltrations: { is: ==SomeFunction== }},currentFilter: null,onSubmit: ==SomeFunction==,onClose: ==SomeFunction==,style: { left: 150, top: 200 }}', () => {
			setup()

			window.scrollX = 50
			window.scrollY = 50

			act(() => {
				mockFilterLineProps.onItemClick(0, {
					// @ts-expect-error
					getBoundingClientRect() {
						return {
							left: 100,
							top: 100,
							height: 50
						}
					}
				})
			})

			expect(mockFilterDetailsWindowProps.filter.id).toEqual(0)
			expect(mockFilterDetailsWindowProps.filter.label).toEqual('first')
			expect(mockFilterDetailsWindowProps.filter.type).toEqual('date')
			expect(
				mockFilterDetailsWindowProps.filter.standartFiltrations
			).toBeInstanceOf(Object)

			expect(mockFilterDetailsWindowProps.currentFilter?.id).toEqual(0)
			expect(mockFilterDetailsWindowProps.currentFilter?.name).toEqual('first')
			expect(mockFilterDetailsWindowProps.currentFilter?.key).toEqual('is')
			expect(mockFilterDetailsWindowProps.currentFilter?.value).toEqual(
				new Date('01-01-2022')
			)
			expect(mockFilterDetailsWindowProps.onSubmit).toBeInstanceOf(Function)
			expect(mockFilterDetailsWindowProps.onClose).toBeInstanceOf(Function)
			expect(mockFilterDetailsWindowProps.style).toMatchObject({
				left: 150,
				top: 200
			})
		})

		describe('After call FilterDetailsWindow onClose', () => {
			it('FilterDetailsWindow should hide', () => {
				setup()

				window.scrollX = 50
				window.scrollY = 50

				act(() => {
					mockFilterLineProps.onItemClick(0, {
						// @ts-expect-error
						getBoundingClientRect() {
							return {
								left: 100,
								top: 100,
								height: 50
							}
						}
					})
				})

				const filterDetailsWindow = screen.getByTestId('FilterDetailsWindow')
				expect(filterDetailsWindow).toBeInTheDocument()

				act(() => {
					mockFilterDetailsWindowProps.onClose()
				})

				expect(filterDetailsWindow).not.toBeInTheDocument()
			})
		})

		describe('After call FilterDetailsWindow onSubmit', () => {
			it('with standart key, onChange should be called with [{"id": 0, "key": "is before", "name": "first", "value": 2022-01-01T22:00:00.000Z}, {"id": 1, "key": "is be", "name": "second", "value": 2022-01-02T22:00:00.000Z}]', () => {
				const onChange = jest.fn()
				setup({ onChange })

				act(() => {
					mockFilterLineProps.onItemClick(0, {
						// @ts-expect-error
						getBoundingClientRect() {
							return {
								left: 100,
								top: 100,
								height: 50
							}
						}
					})
				})

				act(() => {
					mockFilterDetailsWindowProps.onSubmit({
						key: 'is before',
						value: new Date('01-02-2022')
					})
				})

				expect(onChange).toBeCalledWith([
					{
						id: 0,
						key: 'is before',
						name: 'first',
						value: new Date('01-02-2022')
					},
					{
						id: 1,
						key: 'is be',
						name: 'second',
						value: new Date('01-03-2022')
					}
				])
			})

			it('FilterDetailsWindow should hide after call onSubmit with standart key', () => {
				const onChange = jest.fn()
				setup({ onChange })

				act(() => {
					mockFilterLineProps.onItemClick(0, {
						// @ts-expect-error
						getBoundingClientRect() {
							return {
								left: 100,
								top: 100,
								height: 50
							}
						}
					})
				})

				const filterDetailsWindow = screen.getByTestId('FilterDetailsWindow')
				expect(filterDetailsWindow).toBeInTheDocument()

				act(() => {
					mockFilterDetailsWindowProps.onSubmit({
						key: 'is before',
						value: new Date('01-02-2022')
					})
				})

				expect(filterDetailsWindow).not.toBeInTheDocument()
			})

			it('with specical key, onChange should be called with [{"id": 0, "key": "is within", "name": "first", "value": [2022-01-03T22:00:00.000Z, 2022-01-06T22:00:00.000Z]}, {"id": 1, "key": "is be", "name": "second", "value": 2022-01-02T22:00:00.000Z}]', () => {
				const onChange = jest.fn()
				setup({ onChange })

				act(() => {
					mockFilterLineProps.onItemClick(0, {
						// @ts-expect-error
						getBoundingClientRect() {
							return {
								left: 100,
								top: 100,
								height: 50
							}
						}
					})
				})

				act(() => {
					mockFilterDetailsWindowProps.onSubmit({
						key: 'is within',
						value: [new Date('01-04-2022'), new Date('01-07-2022')]
					})
				})

				expect(onChange).toBeCalledWith([
					{
						id: 0,
						key: 'is within',
						name: 'first',
						value: [new Date('01-04-2022'), new Date('01-07-2022')]
					},
					{
						id: 1,
						key: 'is be',
						name: 'second',
						value: new Date('01-03-2022')
					}
				])
			})

			it('FilterDetailsWindow should hide after call onSubmit with specical key', () => {
				const onChange = jest.fn()
				setup({ onChange })

				act(() => {
					mockFilterLineProps.onItemClick(0, {
						// @ts-expect-error
						getBoundingClientRect() {
							return {
								left: 100,
								top: 100,
								height: 50
							}
						}
					})
				})

				const filterDetailsWindow = screen.getByTestId('FilterDetailsWindow')
				expect(filterDetailsWindow).toBeInTheDocument()

				act(() => {
					mockFilterDetailsWindowProps.onSubmit({
						key: 'is within',
						value: [new Date('01-04-2022'), new Date('01-07-2022')]
					})
				})

				expect(filterDetailsWindow).not.toBeInTheDocument()
			})
		})
	})

	it('After call FilterLine onItemDeleteClick with id = 0, onChange should be called with [{"id": 1, "key": "is be", "name": "second", "value": 2022-01-02T22:00:00.000Z}]', () => {
		const onChange = jest.fn()
		setup({ onChange })

		act(() => {
			mockFilterLineProps.onItemDeleteClick(0)
		})

		expect(onChange).toBeCalledWith([
			{
				id: 1,
				key: 'is be',
				name: 'second',
				value: new Date('01-03-2022')
			}
		])
	})
})