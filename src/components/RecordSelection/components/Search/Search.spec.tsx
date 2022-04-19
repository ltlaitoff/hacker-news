import React from 'react'
import Search from './Search'
import { render, cleanup, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'

describe('RecordSelection Search', () => {
	let wrapper: RenderResult | null = null
	let input: HTMLElement | null = null
	let button: HTMLElement | null = null
	let mockOnSubmit: any = null

	beforeEach(() => {
		mockOnSubmit = jest.fn()
		wrapper = render(<Search onSubmit={mockOnSubmit} />)
		input = wrapper.getByRole('textbox')
		button = wrapper.getByRole('button')
	})

	afterEach(() => {
		cleanup()
	})

	it('input should be in component', () => {
		expect(input).toBeInTheDocument()
	})

	it('button should be in component', () => {
		expect(button).toBeInTheDocument()
	})

	it('svg should be in button in component', () => {
		const svg = wrapper?.getByRole('svgElement')

		expect(svg).toBeInTheDocument()
		expect(button && svg && svg.parentNode === button).toBeTruthy()
	})

	it('onSubmit should be called on filled input and submit from input', () => {
		if (!input) return

		user.type(input, 'test text')
		user.type(input, '{enter}')

		expect(mockOnSubmit).toBeCalled()
	})

	it('onSubmit should be called on filled input and submit from click on button', () => {
		if (!input || !button) return

		user.type(input, 'test text')
		user.click(button)

		expect(mockOnSubmit).toBeCalledWith('test text')
	})

	it('button disabled on empty input should be disabled', () => {
		if (!button) return

		expect(button).toBeDisabled()
	})

	it('onSubmit should be NOT called on click not disabled button and not filled input', () => {
		if (!input || !button) return
		button.removeAttribute('disabled')
		user.click(button)

		expect(mockOnSubmit).not.toBeCalled()
	})

	it('input maxLength should be 64', () => {
		expect(input?.getAttribute('maxLength')).toBe('64')
	})

	it('on submit text > 64 letters onSubmit should be not called', () => {
		if (!input || !button) return

		input.removeAttribute('maxLength')

		const TEXT_100 = 't'.repeat(100)
		user.type(input, TEXT_100)

		user.click(button)

		expect(mockOnSubmit).not.toBeCalled()
	})
})
