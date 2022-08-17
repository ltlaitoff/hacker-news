import React, { FC, useState, useCallback } from 'react'
import classNames from 'classnames'

import { SelectProps, SelectRecord } from './Select.interfaces'
import { SelectBase } from './components'
import { getSelectRecordItemById } from './helpers'

import List from 'components/List'
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

	const onListOutsideClick = useCallback(() => setListIsOpened(false), [])
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

	const listOpenedToggle = useCallback(() => {
		if (!disabled) {
			setListIsOpened(currentListOpened => !currentListOpened)
		}
	}, [disabled])

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
			/>

			{listIsOpened && !disabled && (
				<List
					options={options}
					onItemClick={onItemClick}
					selectedItem={selectedItem}
					onOutsideClick={onListOutsideClick}
					shadowDisabled={shadowDisabled || shadowListDisabled}
				/>
			)}
		</div>
	)
}
export default Select
