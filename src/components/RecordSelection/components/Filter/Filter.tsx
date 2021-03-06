import React, { FC, useState } from 'react'
import classNames from 'classnames'
import List, { ListRecord } from 'components/List'
import { FilterPosition, FilterProps } from './Filter.interfaces'
import { DEFAULT_POPUP_OFFSET } from './constants'
import { FilterDetailsWindow, FilterLine } from './components'
import {
	getDifferenceFirstAndSecondArraysWithIdField,
	getFilterById,
	getPopupOffset,
	transformNameObjectArrayToOptions
} from './helpers'
import { FilterReceived } from 'typescript'

const Filter: FC<FilterProps> = ({
	filters,
	currentFilters,
	onChange,
	className,
	...args
}) => {
	const [viewSelectFilter, setViewSelectFilter] = useState<boolean>(false)
	const [popupOffset, setPopupOffset] =
		useState<FilterPosition>(DEFAULT_POPUP_OFFSET)
	const [currentSelectedFiterId, setCurrentSelectedFiterId] = useState<
		number | null
	>(null)
	const [viewFilterDetailsWindow, setViewFilterDetailsWindow] =
		useState<boolean>(false)

	const onAddButtonClick = (element: HTMLButtonElement | null) => {
		setCurrentSelectedFiterId(null)
		setViewSelectFilter(currentView => !currentView)
		setViewFilterDetailsWindow(false)

		if (element) {
			setPopupOffset(getPopupOffset(element))
		}
	}

	const onChoiceFilterInSelect = (item: ListRecord) => {
		setCurrentSelectedFiterId(item.id)
		setViewSelectFilter(false)
		setViewFilterDetailsWindow(true)
	}

	const onSubmit = (value: any) => {
		if (currentSelectedFiterId === null) return

		const filterExistsIndex = currentFilters.findIndex(
			filter => filter.id === currentSelectedFiterId
		)

		const newValue: FilterReceived = {
			id: currentSelectedFiterId,
			name: filters.filter(filter => filter.id === currentSelectedFiterId)[0]
				.name,
			...value
		}

		onClose()

		if (filterExistsIndex !== -1) {
			const changedFilters = [...currentFilters]
			changedFilters[filterExistsIndex] = newValue

			onChange(changedFilters)
			return
		}

		onChange([...currentFilters, newValue])
	}

	const onListOutsideClick = () => {
		setViewSelectFilter(false)
	}

	const onClose = () => {
		if (viewFilterDetailsWindow) {
			setViewFilterDetailsWindow(false)
		}

		setCurrentSelectedFiterId(null)
	}

	const onFilterClick = (id: number, ref: HTMLDivElement) => {
		setViewFilterDetailsWindow(true)
		setCurrentSelectedFiterId(id)

		setPopupOffset(getPopupOffset(ref))

		if (viewFilterDetailsWindow) {
			setViewFilterDetailsWindow(false)
		}
	}

	const onFilterDelete = (id: number) => {
		onChange(currentFilters.filter(value => value.id !== id))

		if (viewFilterDetailsWindow) {
			setViewFilterDetailsWindow(false)
		}
	}

	const FilterDetailsWindowWrapper = () => {
		const filter = getFilterById(filters, currentSelectedFiterId)
		if (filter === null) return null

		const currentFilter = getFilterById(currentFilters, currentSelectedFiterId)

		return (
			<FilterDetailsWindow
				filter={filter}
				currentFilter={currentFilter}
				onSubmit={onSubmit}
				onClose={onClose}
				style={popupOffset}
			/>
		)
	}

	return (
		<div className={classNames(className)} {...args} data-testid='filter'>
			<FilterLine
				allFilters={filters}
				currentFilters={currentFilters}
				onAddClick={onAddButtonClick}
				onItemClick={onFilterClick}
				onItemDeleteClick={onFilterDelete}
			/>

			{viewSelectFilter && (
				<List
					className='w-40'
					options={transformNameObjectArrayToOptions(
						getDifferenceFirstAndSecondArraysWithIdField(
							filters,
							currentFilters
						)
					)}
					onItemClick={onChoiceFilterInSelect}
					onOutsideClick={onListOutsideClick}
					style={popupOffset}
				/>
			)}

			{viewFilterDetailsWindow && currentSelectedFiterId !== null && (
				<FilterDetailsWindowWrapper />
			)}
		</div>
	)
}

export default Filter
