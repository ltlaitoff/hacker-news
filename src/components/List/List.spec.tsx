import React from 'react'
import { screen, render, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import List, { ListProps } from '.'
import user from '@testing-library/user-event'
import { onKeyPressObserver } from 'observers'

onKeyPressObserver.mount()

const DEFAULT_OPTIONS = [
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

const SELECTED_ITEM = {
	id: 0,
	label: 'zero'
}

const setup = ({
	options = DEFAULT_OPTIONS,
	onItemClick = jest.fn(),
	selectedItem = SELECTED_ITEM,
	onOutsideClick = jest.fn(),
	customAttributes = {}
}: Partial<ListProps> & {
	customAttributes?: Record<string, string>
} = {}) => {
	render(
		<List
			options={options}
			onItemClick={onItemClick}
			selectedItem={selectedItem}
			onOutsideClick={onOutsideClick}
			shadowDisabled={false}
			{...customAttributes}
		/>
	)
}

describe('List', () => {
	it('"list" should be in the document', () => {
		setup()

		const list = screen.getByTestId('list')
		expect(list).toBeInTheDocument()
	})

	it(`With options = ${DEFAULT_OPTIONS} "list" should have 3 items`, () => {
		setup()

		const items = screen.getAllByTestId('item')

		expect(items).toHaveLength(3)
	})

	describe('Check every items', () => {
		const OPTIONS = [
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

		OPTIONS.forEach(option => {
			describe(`Item with index = ${option.id}, label = "${option.label}"`, () => {
				it(`"item"(${option.id}) should have button with text = ${option.label}`, () => {
					setup({ options: OPTIONS })

					const item = screen.getAllByTestId('item')[option.id]
					const button = within(item).getByTestId('button')

					expect(button).toBeInTheDocument()
					expect(button).toHaveTextContent(option.label)
				})

				it(`After click on "item"(${
					option.id
				}) button, onItemClick should be called with ${JSON.stringify(
					option
				)}`, () => {
					const onItemClick = jest.fn()
					setup({ options: OPTIONS, onItemClick: onItemClick })

					const item = screen.getAllByTestId('item')[option.id]
					const button = within(item).getByTestId('button')

					expect(onItemClick).not.toBeCalled()

					user.click(button)

					expect(onItemClick).toBeCalled()
				})
			})
		})
	})

	it('After click outside of "list", onOutsideClick should be called', () => {
		const onOutsideClick = jest.fn()
		setup({ onOutsideClick })

		user.click(document.body)
		expect(onOutsideClick).toBeCalled()
	})
})
