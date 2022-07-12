import React from 'react'
import { screen, render, within, act } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Select from './Select'
import { SelectProps, SelectRecord } from './Select.interfaces'
import { ListProps } from 'components/List'
import { SelectBaseProps } from './components'
import { onKeyPressObserver } from 'observers'

onKeyPressObserver.mount()

let mockListProps = {} as ListProps
let mockSelectBaseProps = {} as SelectBaseProps

jest.mock('components/List', () => {
	const List = (props: ListProps) => {
		mockListProps = { ...props }

		return <div data-testid='list' />
	}
	return List
})

jest.mock('./components', () => {
	const SelectBase = (props: SelectBaseProps) => {
		mockSelectBaseProps = { ...props }

		return <div data-testid='select-base' />
	}

	return {
		SelectBase: SelectBase
	}
})

const OPTIONS: SelectRecord[] = [
	{
		id: 0,
		label: 'zero'
	},
	{
		id: 1,
		label: 'first'
	},
	{
		id: 2,
		label: 'second'
	}
]

const setup = ({
	onClick = jest.fn(),
	onChange = jest.fn(),
	disabled = false,
	defaultSelectId = 0,
	customAttributes = {}
}: Partial<SelectProps> & {
	customAttributes?: Record<string, string>
} = {}) => {
	mockListProps = {} as ListProps
	mockSelectBaseProps = {} as SelectBaseProps

	render(
		<Select
			options={OPTIONS}
			onClick={onClick}
			onChange={onChange}
			disabled={disabled}
			defaultSelectId={defaultSelectId}
			{...customAttributes}
		/>
	)
}

beforeEach(() => {
	expect.hasAssertions()
})

describe('Select', () => {
	it('"select" should be in the document', () => {
		setup()

		const select = screen.getByTestId('select')
		expect(select).toBeInTheDocument()
	})

	it('"select" should include "select-base"', () => {
		setup()

		const select = screen.getByTestId('select')
		const base = within(select).getByTestId('select-base')

		expect(base).toBeInTheDocument()
	})

	it('"select-base" should have props = {onClick: ==Function==, listIsOpened: false, disabled: false, selectedItem={id: 0, label: "zero"}}', () => {
		setup()

		expect(mockSelectBaseProps).toMatchObject({
			disabled: false,
			listIsOpened: false,
			selectedItem: { id: 0, label: 'zero' }
		})
		expect(mockSelectBaseProps.onClick).toBeInstanceOf(Function)
	})

	describe('After call base onClick', () => {
		it('"select-base" should re render with props = {onClick: ==Function==, listIsOpened: true, disabled: false, selectedItem={id: 0, label: "zero"}}', () => {
			setup()

			act(() => {
				mockSelectBaseProps.onClick()
			})

			expect(mockSelectBaseProps).toMatchObject({
				disabled: false,
				listIsOpened: true,
				selectedItem: { id: 0, label: 'zero' }
			})

			expect(mockSelectBaseProps.onClick).toBeInstanceOf(Function)
		})

		it('"list" should be in the "select"', () => {
			setup()

			act(() => {
				mockSelectBaseProps.onClick()
			})

			const select = screen.getByTestId('select')
			const list = within(select).getByTestId('list')

			expect(list).toBeInTheDocument()
		})

		it('"list" should have props = {options: [{ id: 0, label: "zero" },{ id: 1, label: "first" },{ id: 2, label: "second" }], onItemClick: ==Function==, selectedItem: {id: 0, label: "zero"}, onOutsideClick: ==Function==}', () => {
			setup()

			act(() => {
				mockSelectBaseProps.onClick()
			})

			expect(mockListProps).toMatchObject({
				selectedItem: { id: 0, label: 'zero' },
				options: [
					{ id: 0, label: 'zero' },
					{ id: 1, label: 'first' },
					{ id: 2, label: 'second' }
				]
			})

			expect(mockListProps.onItemClick).toBeInstanceOf(Function)
			expect(mockListProps.onOutsideClick).toBeInstanceOf(Function)
		})

		describe('After call onItemClick from "list" with arg = currentSelectedItem = {id: 0, label: "zero"}', () => {
			it('"list" should NOT be in the document', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onItemClick({ id: 0, label: 'zero' })
				})

				const list = screen.queryByTestId('list')
				expect(list).not.toBeInTheDocument()
			})

			it('"select-base" should re render with props = {onClick: ==Function==, listIsOpened: false, disabled: false, selectedItem: {id: 0, label: "zero"}}', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onItemClick({ id: 0, label: 'zero' })
				})

				expect(mockSelectBaseProps).toMatchObject({
					disabled: false,
					listIsOpened: false,
					selectedItem: { id: 0, label: 'zero' }
				})

				expect(mockSelectBaseProps.onClick).toBeInstanceOf(Function)
			})

			it('onClick should be called with id = 0', () => {
				const onClick = jest.fn()
				setup({ onClick })

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onItemClick({ id: 0, label: 'zero' })
				})

				expect(onClick).toBeCalledWith(0)
			})
		})

		describe('After call onItemClick from "list" with arg = {id: 1, label: "first"} !== currentSelectedItem', () => {
			it('"list" should NOT be in the document', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onItemClick({ id: 1, label: 'first' })
				})

				const list = screen.queryByTestId('list')
				expect(list).not.toBeInTheDocument()
			})

			it('onClick should be called with id = 1', () => {
				const onClick = jest.fn()
				setup({ onClick })

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onItemClick({ id: 1, label: 'first' })
				})

				expect(onClick).toBeCalledWith(1)
			})

			it('onChange should be called with id = 1', () => {
				const onChange = jest.fn()
				setup({ onChange })

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onItemClick({ id: 1, label: 'first' })
				})

				expect(onChange).toBeCalledWith(1)
			})

			it('"selest-base" should re render with props = {onClick: ==Function==, listIsOpened: false, disabled: false, selectedItem: {id: 1, label: "first"}}', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onItemClick({ id: 1, label: 'first' })
				})

				expect(mockSelectBaseProps).toMatchObject({
					disabled: false,
					listIsOpened: false,
					selectedItem: { id: 1, label: 'first' }
				})

				expect(mockSelectBaseProps.onClick).toBeInstanceOf(Function)
			})
		})

		describe('After call onOutsideClick from "list"', () => {
			it('"list" should NOT be in the document', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onOutsideClick()
				})

				const list = screen.queryByTestId('list')
				expect(list).not.toBeInTheDocument()
			})

			it('"select-base" should re render with props = {onClick: ==Function==, listIsOpened: false, disabled: false, selectedItem={id: 0, label: "zero"}}', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				act(() => {
					mockListProps.onOutsideClick()
				})

				expect(mockSelectBaseProps).toMatchObject({
					disabled: false,
					listIsOpened: false,
					selectedItem: { id: 0, label: 'zero' }
				})

				expect(mockSelectBaseProps.onClick).toBeInstanceOf(Function)
			})
		})
		describe('After press Esc button', () => {
			it('"list" should NOT be in the document', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				user.keyboard('{Escape}')

				const list = screen.queryByTestId('list')
				expect(list).not.toBeInTheDocument()
			})

			it('"select-base" should re render with props = {onClick: ==Function==, listIsOpened: false, disabled: false, selectedItem={id: 0, label: "zero"}}', () => {
				setup()

				act(() => {
					mockSelectBaseProps.onClick()
				})

				user.keyboard('{Escape}')

				expect(mockSelectBaseProps).toMatchObject({
					disabled: false,
					listIsOpened: false,
					selectedItem: { id: 0, label: 'zero' }
				})

				expect(mockSelectBaseProps.onClick).toBeInstanceOf(Function)
			})
		})
	})

	describe('With disabled = true', () => {
		describe('After call "select-base" onClick', () => {
			it('"list" should NOT be in the document', () => {
				setup({ disabled: true })

				mockSelectBaseProps.onClick()

				const list = screen.queryByTestId('list')
				expect(list).not.toBeInTheDocument()
			})
		})
	})

	describe('With defaultSelectId = 1', () => {
		it('"select-base" should rendered with props = {listIsOpened: false, disabled: false, selectedItem: {id: 1, label: "first"}, onClick: ==Function==}', () => {
			setup({ defaultSelectId: 1 })

			expect(mockSelectBaseProps).toMatchObject({
				disabled: false,
				listIsOpened: false,
				selectedItem: { id: 1, label: 'first' }
			})

			expect(mockSelectBaseProps.onClick).toBeInstanceOf(Function)
		})
	})

	it('Custom attribute data-hello="1" should be in "select"', () => {
		setup({ customAttributes: { 'data-hello': '1' } })

		const select = screen.getByTestId('select')
		expect(select).toHaveAttribute('data-hello', '1')
	})
})
