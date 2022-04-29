import React, { FC, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import { SelectProps, SelectRecord } from './Select.interfaces'

import SelectList from 'components/SelectList'
import SelectBase from './components/SelectBase'

const getItemById = (items: SelectRecord[], id: number): SelectRecord[] => {
	return items.filter(item => item.id === id)
}

const Select: FC<SelectProps> = ({
	options,
	onClick,
	onChange,
	disabled,
	defaultSelectId,
	shadowDisabled,
	shadowBaseDisabled,
	shadowListDisabled,
	className,
	...args
}) => {
	const [selectedItem, setSelectedItem] = useState<SelectRecord>(
		defaultSelectId ? getItemById(options, defaultSelectId)[0] : options[0]
	)
	const [listIsOpened, setListIsOpened] = useState<boolean>(false)

	const selectRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!disabled) {
			const onEscPress = (e: KeyboardEvent) => {
				if (e.code === 'Escape') {
					setListIsOpened(false)
				}
			}

			const onClickOutside = (e: MouseEvent) => {
				if (
					!selectRef.current ||
					selectRef.current.contains(e.target as Node)
				) {
					return
				}

				setListIsOpened(false)
			}

			document.addEventListener('keydown', onEscPress)
			document.addEventListener('click', onClickOutside)

			return () => {
				document.removeEventListener('keydown', onEscPress)
				document.removeEventListener('click', onClickOutside)
			}
		}
	}, [])

	const onItemClick = (itemData: SelectRecord) => {
		if (onClick) onClick(itemData.id)

		if (selectedItem.id !== itemData.id) {
			if (onChange) onChange(itemData.id)

			setSelectedItem(itemData)
		}

		setListIsOpened(false)
	}

	const listOpenedToggle = () => {
		if (!disabled) {
			setListIsOpened(currentListOpened => !currentListOpened)
		}
	}

	return (
		<div
			className={classNames('relative w-48 text-gray-500', className)}
			ref={selectRef}
			{...args}
		>
			<SelectBase
				onClick={listOpenedToggle}
				listIsOpened={listIsOpened}
				disabled={disabled}
				shadowDisabled={shadowDisabled || shadowBaseDisabled}
				selectedItem={selectedItem}
			/>

			<SelectList
				show={listIsOpened && !disabled}
				options={options}
				onItemClick={onItemClick}
				selectedItem={selectedItem}
				shadowDisabled={shadowDisabled || shadowListDisabled}
			/>
		</div>
	)
}
export default Select
