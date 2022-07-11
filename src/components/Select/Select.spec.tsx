import React from 'react'
import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Select from './Select'
import { SelectRecord } from './Select.interfaces'
import { SelectListProps } from 'components/SelectList'

jest.doMock('components/SelectList', () => {
	const SelectList = () => <div />
	return SelectList
})

const OPTIONS: SelectRecord[] = [
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

const setup = ({
	onClick = jest.fn(),
	onChange = jest.fn(),
	disabled = false,
	defaultSelectId = 0
} = {}) => {
	render(
		<Select
			options={OPTIONS}
			onClick={onClick}
			onChange={onChange}
			disabled={disabled}
			defaultSelectId={defaultSelectId}
		/>
	)
}

describe('Select', () => {
	// it('Select should be in document', () => {
	// 	setup()
	// 	const select = screen.getByTestId('select')
	// 	expect(select).toBeInTheDocument()
	// })
	// it.only('SelectList should includes items', () => {
	// 	setup()
	// 	const base = screen.getByTestId('base')
	// 	user.click(base)
	// 	expect(SelectListMocked).toBeInTheDocument()
	// 	// const list = screen.getByTestId('list')
	// 	// const items = screen.getAllByTestId('item')
	// 	// const listChildren = Array.from(list?.childNodes)
	// 	// expect(listChildren.length === items.length).toBeTruthy()
	// 	// listChildren.forEach((item, index) => {
	// 	// 	expect(item === items[index]).toBeTruthy()
	// 	// })
	// 	// OPTIONS.forEach((item, index) => {
	// 	// 	expect(item.label === items[index].textContent).toBeTruthy()
	// 	// })
	// })
	// it('On click on current selected element should be called onClick function', () => {
	// 	if (!mainButton || !wrapper) throw Error
	// 	user.click(mainButton)
	// 	const items = wrapper.getAllByTestId('item')
	// 	user.click(items[0])
	// 	expect(onClick).toBeCalledWith(0)
	// })
	// it('On click on NOT current selected element should be called onClick and onChange functions', () => {
	// 	if (!mainButton || !wrapper) throw Error
	// 	user.click(mainButton)
	// 	const items = wrapper.getAllByTestId('item')
	// 	user.click(items[1])
	// 	expect(onClick).toBeCalledWith(1)
	// 	expect(onChange).toBeCalledWith(1)
	// })
	// it('On click main-button Select should open a list of items', () => {
	// 	if (!mainButton) throw Error
	// 	user.click(mainButton)
	// 	const list = wrapper?.getByTestId('list')
	// 	expect(list).toBeInTheDocument()
	// })
	// it('On click outside component with opened list should closing the list', () => {
	// 	const OPTIONS = [
	// 		{
	// 			id: 0,
	// 			label: 'first'
	// 		},
	// 		{
	// 			id: 1,
	// 			label: 'second'
	// 		},
	// 		{
	// 			id: 2,
	// 			label: 'third'
	// 		}
	// 	]
	// 	wrapper = render(
	// 		<div data-testid='div'>
	// 			<Select options={OPTIONS} onClick={onClick} onChange={onChange} />
	// 		</div>
	// 	)
	// 	const mainButton = wrapper.getByTestId('main-button')
	// 	user.click(mainButton)
	// 	const list = wrapper.getByTestId('list')
	// 	expect(list).toBeInTheDocument()
	// 	const div = wrapper.getByTestId('div')
	// 	user.click(div)
	// 	expect(list).not.toBeInTheDocument()
	// })
	// it('On click main-button Select and Selec is disable should NOT open a list of items', () => {
	// 	const OPTIONS = [
	// 		{
	// 			id: 0,
	// 			label: 'first'
	// 		},
	// 		{
	// 			id: 1,
	// 			label: 'second'
	// 		},
	// 		{
	// 			id: 2,
	// 			label: 'third'
	// 		}
	// 	]
	// 	wrapper = render(
	// 		<Select
	// 			options={OPTIONS}
	// 			onClick={onClick}
	// 			onChange={onChange}
	// 			disabled
	// 		/>
	// 	)
	// 	const mainButton = wrapper.getByTestId('main-button')
	// 	user.click(mainButton)
	// 	expect(() => wrapper?.getByTestId('list')).toThrow()
	// })
	// it('defaultSelectId element should be rendered in mainButton by default', () => {
	// 	const OPTIONS = [
	// 		{
	// 			id: 0,
	// 			label: 'first'
	// 		},
	// 		{
	// 			id: 1,
	// 			label: 'second'
	// 		},
	// 		{
	// 			id: 2,
	// 			label: 'third'
	// 		}
	// 	]
	// 	wrapper = render(
	// 		<Select
	// 			options={OPTIONS}
	// 			onClick={onClick}
	// 			onChange={onChange}
	// 			defaultSelectId={1}
	// 		/>
	// 	)
	// 	const mainButton = wrapper.getByTestId('main-button')
	// 	expect(mainButton.textContent?.includes(OPTIONS[1].label)).toBeTruthy()
	// })
})
