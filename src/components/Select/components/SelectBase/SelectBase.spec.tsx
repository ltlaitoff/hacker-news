import React from 'react'
import { screen, render, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SelectBase, SelectBaseProps } from '../SelectBase'
import user from '@testing-library/user-event'

const setup = ({
	onClick = jest.fn(),
	disabled = false,
	selectedItem = { id: 0, label: 'selectedItem' },
	customAttributes = {}
}: Partial<SelectBaseProps> & {
	customAttributes?: Record<string, string>
} = {}) => {
	render(
		<SelectBase
			onClick={onClick}
			disabled={disabled}
			selectedItem={selectedItem}
			listIsOpened={false}
			{...customAttributes}
		/>
	)
}

describe('Select/SelectBase', () => {
	it('"button" should be in the document', () => {
		setup()

		const button = screen.getByTestId('button')
		expect(button).toBeInTheDocument()
	})

	it('"button" should have inside "selectedItem" and svg', () => {
		setup()

		const button = screen.getByTestId('button')
		const selectedItem = within(button).getByTestId('selectedItem')
		const svg = within(button).getByRole('svgElement')

		expect(button).toBeInTheDocument()
		expect(selectedItem).toBeInTheDocument()
		expect(svg).toBeInTheDocument()
	})

	it('With selectedItem = {id: 1, label: "test selectedItem"}, "selectedItem" should have text = "test selectedItem', () => {
		setup({ selectedItem: { id: 1, label: 'test selectedItem' } })

		const selectedItem = screen.getByTestId('selectedItem')

		expect(selectedItem).toHaveTextContent('test selectedItem')
	})

	it('After click on "button", onClick prop should be called', () => {
		const onClick = jest.fn()
		setup({ onClick })

		const button = screen.getByTestId('button')

		user.click(button)
		expect(onClick).toBeCalled()
	})

	it('After click on "button" with disabled prop = true, onClick prop should be called', () => {
		const onClick = jest.fn()
		setup({ onClick, disabled: true })

		const button = screen.getByTestId('button')

		user.click(button)
		expect(onClick).not.toBeCalled()
	})
})
