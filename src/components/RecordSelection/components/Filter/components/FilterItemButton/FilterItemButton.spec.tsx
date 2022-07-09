import React, { createRef, Ref, RefObject } from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import FilterItemButton from './FilterItemButton'
import { FilterItemButtonProps } from './FilterItemButton.interfaces'

jest.mock('../../constants', () => {
	return {
		FILTER_DATE_FORMAT: 'dd-MM-Y'
	}
})

const setup = ({
	id = -1,
	name = 'name',
	filterKey = 'key',
	value = new Date('01-01-2022'),
	onClose = jest.fn(),
	onClick = jest.fn(),
	ref = createRef(),
	customAttributes = {}
}: Partial<FilterItemButtonProps> & {
	ref?: Ref<HTMLDivElement>
	customAttributes?: Record<string, string>
} = {}) => {
	render(
		<FilterItemButton
			id={id}
			name={name}
			filterKey={filterKey}
			value={value}
			onClose={onClose}
			onClick={onClick}
			ref={ref}
			{...customAttributes}
		/>
	)
}

describe('FilterItemButton', () => {
	it('"wrapper" should be in the document', () => {
		setup()

		const wrapper = screen.getByTestId('wrapper')
		expect(wrapper).toBeInTheDocument()
	})

	it('"wrapper" should have "content-button"', () => {
		setup()

		const wrapper = screen.getByTestId('wrapper')
		const contentButton = screen.getByTestId('content-button')

		expect(wrapper).toContainElement(contentButton)
	})

	it('"wrapper" should have "close-button"', () => {
		setup()

		const wrapper = screen.getByTestId('wrapper')
		const closeButton = screen.getByTestId('close-button')

		expect(wrapper).toContainElement(closeButton)
	})

	it.each`
		name      | filterKey | value                     | dateValue
		${'name'} | ${'key'}  | ${new Date('01-01-2022')} | ${'01-01-2022'}
		${'Date'} | ${'is'}   | ${new Date('01-31-2022')} | ${'31-01-2022'}
	`(
		'With name = $name, filterKey = $filterKey and value = $value contentButton should have 3 childs: first = $name, second = $filterKey, third = $dateValue',
		({ name, filterKey, value, dateValue }) => {
			setup({
				name: name,
				filterKey: filterKey,
				value: value
			})

			const contentButton = screen.getByTestId('content-button')

			const nameElement = contentButton.children[0]
			const filterKeyElement = contentButton.children[1]
			const dateElement = contentButton.children[2]

			expect(nameElement.textContent).toBe(name)
			expect(filterKeyElement.textContent).toBe(filterKey)
			expect(dateElement.textContent).toBe(dateValue)
		}
	)

	it('closeButton should have as child a svg', () => {
		setup()

		const closeButton = screen.getByTestId('close-button')
		const svg = screen.getByRole('svgElement')

		expect(closeButton).toContainElement(svg)
	})

	it.each`
		id
		${1}
		${3}
	`(
		'With id = $id after click on contentButton onClick should be called with $id',
		({ id }) => {
			const onClick = jest.fn()
			setup({ id, onClick })

			const contentButton = screen.getByTestId('content-button')

			expect(onClick).not.toBeCalled()

			user.click(contentButton)

			expect(onClick).toBeCalledWith(id)
		}
	)

	it.each`
		id
		${1}
		${3}
	`(
		'With id = $id after click on closeButton onClose should be called with $id',
		({ id }) => {
			const onClose = jest.fn()
			setup({ id, onClose })

			const closeButton = screen.getByTestId('close-button')

			expect(onClose).not.toBeCalled()

			user.click(closeButton)

			expect(onClose).toBeCalledWith(id)
		}
	)

	it('After component rendering ref(prop).current should be a "wrapper" element', () => {
		const ref = createRef() as RefObject<HTMLDivElement>
		setup({ ref: ref })

		const wrapper = screen.getByTestId('wrapper')

		expect(ref?.current).toBe(wrapper)
	})

	it('After component rendering data-hello="1" custom prop should be in the outer html', () => {
		setup({ customAttributes: { 'data-hello': '1' } })

		const wrapper = screen.getByTestId('wrapper')

		expect(wrapper).toHaveAttribute('data-hello', '1')
	})
})
