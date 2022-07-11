import React from 'react'
import Search from './Search'
import { screen, render, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import { SearchProps } from './Search.interfaces'

const DEFAULT_VALUE = ''
const MAX_INPUT_LENGTH = 100

jest.mock('./constants', () => {
	return {
		MAX_INPUT_LENGTH
	}
})

const setup = ({
	onSubmit = jest.fn(),
	defaultValue = DEFAULT_VALUE,
	customAttributes = {}
}: Partial<SearchProps> & {
	customAttributes?: Record<string, string>
} = {}) => {
	render(
		<Search
			onSubmit={onSubmit}
			defaultValue={defaultValue}
			{...customAttributes}
		/>
	)
}

describe('Search', () => {
	describe('Check component structure', () => {
		beforeEach(() => {
			setup()
		})

		it('"form" should be in the component', () => {
			const form = screen.getByTestId('form')

			expect(form).toBeInTheDocument()
		})

		it(`"input" should be in form with args = {type: "text", maxLength: "${MAX_INPUT_LENGTH}", required: ""}`, () => {
			const form = screen.getByTestId('form')
			const input = within(form).getByTestId('input')

			expect(input).toBeInTheDocument()

			expect(input).toHaveAttribute('type', 'text')
			expect(input).toHaveAttribute('maxlength', String(MAX_INPUT_LENGTH))
			expect(input).toHaveAttribute('required', '')
		})

		it('"reset-button" should be in form with {type: "reset"}', () => {
			const form = screen.getByTestId('form')
			const resetButton = within(form).getByTestId('reset-button')

			expect(resetButton).toBeInTheDocument()
			expect(resetButton).toHaveAttribute('type', 'reset')
		})

		it('"reset-icon" should be in "reset-button"', () => {
			const resetButton = screen.getByTestId('reset-button')
			const resetIcon = within(resetButton).getByTestId('reset-icon')

			expect(resetIcon).toBeInTheDocument()
		})

		it('"submit-button" should be in form with {type: "submit", disabled: false}', () => {
			const form = screen.getByTestId('form')
			const submitButton = within(form).getByTestId('submit-button')

			expect(submitButton).toBeInTheDocument()
			expect(submitButton).toHaveAttribute('type', 'submit')
		})

		it('"submit-icon" should be in "submit-button"', () => {
			const submitButton = screen.getByTestId('submit-button')
			const submitIcon = within(submitButton).getByTestId('submit-icon')

			expect(submitIcon).toBeInTheDocument()
		})
	})

	describe.each`
		text
		${'text'}
		${'random text'}
		${'jest yes'}
		${'yeee'}
		${'null'}
	`('If write $text in input', ({ text }) => {
		let onSubmit = jest.fn()

		beforeEach(() => {
			onSubmit = jest.fn()
			setup({ onSubmit })
		})

		it(`If write "${text}" in input, it text = "${text}" should be in the input.value`, () => {
			const input = screen.getByTestId('input') as HTMLInputElement

			user.type(input, text)

			expect(input.value).toBe(text)
		})

		it(`If write "${text}" in input and press "Enter", onSubmit should be called with "${text}" and Search re rendered with defaultValue = "${text}"`, () => {
			const input = screen.getByTestId('input') as HTMLInputElement

			user.type(input, text)
			user.type(input, '{Enter}')

			expect(onSubmit).toBeCalledWith(text)
		})

		it(`If write "${text}" in input and press on "submit-button", onSubmit should be called with "${text}" and Search re rendered with defaultValue = "${text}"`, () => {
			const input = screen.getByTestId('input') as HTMLInputElement
			const submitButton = screen.getByTestId('submit-button')

			user.type(input, text)
			user.click(submitButton)

			expect(onSubmit).toBeCalledWith(text)
		})

		it(`If write "${text}" in input and press on "reset-button", onSubmit should be called with "" and Search re rendered with defaultValue = ""`, () => {
			const input = screen.getByTestId('input') as HTMLInputElement
			const resetButton = screen.getByTestId('reset-button')

			user.type(input, text)
			user.click(resetButton)

			expect(onSubmit).toBeCalledWith('')
		})
	})

	describe.each`
		text
		${'t'.repeat(MAX_INPUT_LENGTH + 1)}
		${'r'.repeat(MAX_INPUT_LENGTH + 1)}
		${'wh'.repeat(MAX_INPUT_LENGTH + 1)}
		${'yee'.repeat(MAX_INPUT_LENGTH + 1)}
		${'2'.repeat(MAX_INPUT_LENGTH + 1)}
	`(
		`If write $text biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input with input.maxlength = infinify`,
		({ text }) => {
			beforeEach(() => {
				setup()

				const input = screen.getByTestId('input') as HTMLInputElement
				input.maxLength = Infinity
			})

			describe('and press "Enter" key on input', () => {
				beforeEach(() => {
					const input = screen.getByTestId('input')

					user.type(input, text)
					user.type(input, '{Enter}')
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and press "Enter" key on input, data-error on input should be true`, () => {
					const input = screen.getByTestId('input')

					expect(input).toHaveAttribute('data-error', 'true')
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and press "Enter" key on input, "submit-button" disabled should be true`, () => {
					const submitButton = screen.getByTestId('submit-button')

					expect(submitButton).toHaveAttribute('disabled')
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and press "Enter" key on input, and press on "reset-button", data-error on input should be false`, () => {
					const input = screen.getByTestId('input')
					const resetButton = screen.getByTestId('reset-button')

					user.click(resetButton)

					expect(input).toHaveAttribute('data-error', 'false')
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and press "Enter" key on input, and press on "reset-button", "submit-button" disabled should be false`, () => {
					const submitButton = screen.getByTestId('submit-button')
					const resetButton = screen.getByTestId('reset-button')

					user.click(resetButton)

					expect(submitButton).not.toHaveAttribute('disabled')
				})
			})

			describe('and click on "submit-button"', () => {
				beforeEach(() => {
					const input = screen.getByTestId('input')
					const submitButton = screen.getByTestId('submit-button')

					user.type(input, text)
					user.type(input, '{Enter}')

					user.click(submitButton)
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and click on "submit-button", data-error on input should be true`, () => {
					const input = screen.getByTestId('input')

					expect(input).toHaveAttribute('data-error', 'true')
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and click on "submit-button", "submit-button" disabled should be true`, () => {
					const submitButton = screen.getByTestId('submit-button')

					expect(submitButton).toHaveAttribute('disabled')
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and click on "submit-button", and press on "reset-button", data-error on input should be false`, () => {
					const input = screen.getByTestId('input')
					const resetButton = screen.getByTestId('reset-button')

					user.click(resetButton)

					expect(input).toHaveAttribute('data-error', 'false')
				})

				it(`If write "${text}" biggest ${MAX_INPUT_LENGTH}(MAX_LENGTH) in input and click on "submit-button", and press on "reset-button", "submit-button" disabled should be false`, () => {
					const submitButton = screen.getByTestId('submit-button')
					const resetButton = screen.getByTestId('reset-button')

					user.click(resetButton)

					expect(submitButton).not.toHaveAttribute('disabled')
				})
			})
		}
	)

	it('If defaultValue prop = $defaultValue, input.value should be = $defaultValue', () => {
		setup({ defaultValue: 'test default value' })

		const input = screen.getByTestId('input') as HTMLInputElement

		expect(input.value).toBe('test default value')
	})

	it('If transfer data-hello="1" props into Search, data-hello="1" should be in the "form" html', () => {
		setup({
			customAttributes: { 'data-hello': '1' }
		})

		const form = screen.getByTestId('form')

		expect(form).toHaveAttribute('data-hello', '1')
	})
})
