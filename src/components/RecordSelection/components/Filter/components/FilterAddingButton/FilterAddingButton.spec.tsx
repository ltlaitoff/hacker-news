import React, { createRef, Ref, RefObject } from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import FilterAddingButton from './FilterAddingButton'

const setup = (
	{
		onClick = jest.fn(),
		ref = createRef(),
		customAttributes = {}
	}: {
		onClick?: () => void
		ref?: Ref<HTMLButtonElement>
		customAttributes?: Record<string, string>
	} = { onClick: jest.fn(), ref: createRef(), customAttributes: {} }
) => {
	render(
		<FilterAddingButton onClick={onClick} ref={ref} {...customAttributes} />
	)
}

describe('FilterAddingButton', () => {
	it('button should be in the document', () => {
		setup()
		const button = screen.getByTestId('button')

		expect(button).toBeInTheDocument()
	})

	it('button should have a svg element', () => {
		setup()
		const button = screen.getByTestId('button')
		const svg = button.querySelector('svg')

		expect(svg).toBeInTheDocument()
	})

	it('button should have a text = "Add filter"', () => {
		setup()
		const button = screen.getByTestId('button')

		expect(button.textContent).toMatch('Add filter')
	})

	it('After click on button onClick should be called', () => {
		const onClick = jest.fn()
		setup({ onClick: onClick })

		const button = screen.getByTestId('button')

		expect(onClick).not.toBeCalled()

		user.click(button)

		expect(onClick).toBeCalled()
	})

	it('After component rendering ref(prop).current should be a "button" element', () => {
		const ref = createRef() as RefObject<HTMLButtonElement>
		setup({ ref: ref })

		const button = screen.getByTestId('button')

		expect(ref?.current).toBe(button)
	})

	it('After component rendering data-hello="1" custom prop should be in the outer html', () => {
		setup({ customAttributes: { 'data-hello': '1' } })

		const button = screen.getByTestId('button')

		expect(button).toHaveAttribute('data-hello', '1')
	})
})
