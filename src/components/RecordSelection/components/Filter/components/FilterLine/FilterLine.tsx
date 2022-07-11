import React, { FC, RefCallback, useRef } from 'react'

import { FilterAddingButton, FilterItemButton } from '../../components'
import { getDifferenceFirstAndSecondArraysWithIdField } from '../../helpers'
import { FilterLineProps } from './FilterLine.interfaces'

const FilterLine: FC<FilterLineProps> = ({
	allFilters,
	currentFilters,
	onAddClick,
	onItemClick,
	onItemDeleteClick,
	className,
	...args
}) => {
	const addingButtonRef = useRef<HTMLButtonElement>(null)
	const itemsRef = useRef<Record<string, HTMLDivElement>>({})
	itemsRef.current = {}

	// useEffect(() => {
	// /*
	// XXX: А не означает ли это что мы при каждом перерендере просто удаляем все наши уже созданные рефи и переписываем их
	// */
	// itemsRef.current = Object(Array(currentFilters.length))
	// }, [currentFilters])

	const FilterAddingButtonComponent = () => {
		return (
			<FilterAddingButton
				ref={addingButtonRef}
				onClick={() => onAddClick(addingButtonRef.current)}
				data-testid='add-button'
			/>
		)
	}

	if (currentFilters.length === 0) {
		return <FilterAddingButtonComponent />
	}

	return (
		<div
			className='gap-x-2 inline-flex items-center'
			data-testid='wrapper'
			{...args}
		>
			{currentFilters.map(filter => {
				/*
					TODO: Move in in component scope and it should be a callback
					TODO: Created reducer for it?
				*/
				const refCallback: RefCallback<HTMLDivElement> = element => {
					itemsRef.current = {
						...itemsRef.current,
						[filter.id]: element as HTMLDivElement
					}
				}

				return (
					<FilterItemButton
						ref={refCallback}
						key={filter.id}
						filterKey={filter.key}
						id={filter.id}
						name={filter.name}
						value={filter.value}
						onClick={() => onItemClick(filter.id, itemsRef.current[filter.id])}
						onClose={() => onItemDeleteClick(filter.id)}
						data-testid='item-button'
					/>
				)
			})}

			{Boolean(
				getDifferenceFirstAndSecondArraysWithIdField(allFilters, currentFilters)
					.length
			) && <FilterAddingButtonComponent />}
		</div>
	)
}

export default FilterLine
