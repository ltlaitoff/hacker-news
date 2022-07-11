import React, { FC, useState, useCallback } from 'react'
import classNames from 'classnames'

import { SelectProps, SelectRecord } from './Select.interfaces'
import { SelectBase } from './components'
import { getSelectRecordItemById } from './helpers'

import SelectList from 'components/SelectList'
import useEscKeyDown from 'hooks/useEscKeyDown'

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
		defaultSelectId
			? getSelectRecordItemById(options, defaultSelectId)
			: options[0]
	)
	const [listIsOpened, setListIsOpened] = useState<boolean>(false)

	const onSelectListOutsideClick = useCallback(() => setListIsOpened(false), [])
	const onEscPress = useCallback(() => setListIsOpened(false), [])

	useEscKeyDown(onEscPress, true, !disabled)

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
			data-testid='select'
			{...args}
		>
			<SelectBase
				onClick={listOpenedToggle}
				listIsOpened={listIsOpened}
				disabled={disabled}
				shadowDisabled={shadowDisabled || shadowBaseDisabled}
				selectedItem={selectedItem}
				data-testid='base'
			/>

			{listIsOpened && !disabled && (
				<SelectList
					options={options}
					onItemClick={onItemClick}
					selectedItem={selectedItem}
					onOutsideClick={onSelectListOutsideClick}
					shadowDisabled={shadowDisabled || shadowListDisabled}
					data-testid='list'
				/>
			)}
		</div>
	)
}
export default Select
