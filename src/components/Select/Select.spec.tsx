import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Select from './Select'

describe('Select', () => {
	let wrapper: RenderResult | null = null
	let mainButton: HTMLElement | null = null
	let onClick = jest.fn()
	let onChange = jest.fn()

	describe('', () => {
		beforeEach(() => {
			onClick = jest.fn()
			onChange = jest.fn()

			const OPTIONS = [
				{
					id: 0,
					label: 'first'
				},
				{
					id: 1,
					label: 'second'
				},
				{
					id: 2,
					label: 'third'
				}
			]

			wrapper = render(
				<Select options={OPTIONS} onClick={onClick} onChange={onChange} />
			)

			mainButton = wrapper.getByTestId('main-button')
		})

		afterEach(() => {
			cleanup()
		})

		it('Select should be in document ', () => {
			expect(mainButton).toBeInTheDocument()
		})

		it('On click main-button Select should open a list of items', () => {
			if (!mainButton) throw Error

			user.click(mainButton)
			const list = wrapper?.getByTestId('list')

			expect(list).toBeInTheDocument()
		})

		it('List should includes items', () => {
			if (!mainButton || !wrapper) throw Error

			user.click(mainButton)

			const list = wrapper.getByTestId('list')
			const items = wrapper.getAllByTestId('item')

			const listChildren = Array.from(list?.childNodes)

			expect(listChildren.length === items.length).toBeTruthy()
			listChildren.forEach((item, index) => {
				expect(item === items[index]).toBeTruthy()
			})

			const OPTIONS = [
				{
					id: 0,
					label: 'first'
				},
				{
					id: 1,
					label: 'second'
				},
				{
					id: 2,
					label: 'third'
				}
			]

			OPTIONS.forEach((item, index) => {
				expect(item.label === items[index].textContent).toBeTruthy()
			})
		})

		it('On click on current selected element should be called onClick function', () => {
			if (!mainButton || !wrapper) throw Error

			user.click(mainButton)

			const items = wrapper.getAllByTestId('item')

			user.click(items[0])

			expect(onClick).toBeCalledWith(0)
		})

		it('On click on NOT current selected element should be called onClick and onChange functions', () => {
			if (!mainButton || !wrapper) throw Error

			user.click(mainButton)

			const items = wrapper.getAllByTestId('item')

			user.click(items[1])

			expect(onClick).toBeCalledWith(1)
			expect(onChange).toBeCalledWith(1)
		})
	})

	it('On click main-button Select and Selec is disable should NOT open a list of items', () => {
		const OPTIONS = [
			{
				id: 0,
				label: 'first'
			},
			{
				id: 1,
				label: 'second'
			},
			{
				id: 2,
				label: 'third'
			}
		]

		wrapper = render(
			<Select
				options={OPTIONS}
				onClick={onClick}
				onChange={onChange}
				disabled
			/>
		)

		const mainButton = wrapper.getByTestId('main-button')

		user.click(mainButton)

		expect(() => wrapper?.getByTestId('list')).toThrow()
	})

	it('defaultSelectId element should be rendered in mainButton by default', () => {
		const OPTIONS = [
			{
				id: 0,
				label: 'first'
			},
			{
				id: 1,
				label: 'second'
			},
			{
				id: 2,
				label: 'third'
			}
		]

		wrapper = render(
			<Select
				options={OPTIONS}
				onClick={onClick}
				onChange={onChange}
				defaultSelectId={1}
			/>
		)

		const mainButton = wrapper.getByTestId('main-button')

		expect(
			mainButton.textContent?.replace('|', '') === OPTIONS[1].label
		).toBeTruthy()
	})
})
