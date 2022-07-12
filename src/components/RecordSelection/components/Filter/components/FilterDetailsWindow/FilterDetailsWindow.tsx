import React, { FC, useState, useEffect, useCallback } from 'react'
import {
	DateSpecicalFiltrations,
	DateStandartFiltrations,
	Filter
} from 'data/filters.interfaces'
import classNames from 'classnames'
import Select from 'components/Select'
import DatePicker from 'components/DatePicker'
import { ReactComponent as Cross } from 'assets/icons/cross.svg'
import { getNowDateWithoutTime } from 'helpers'
import {
	DateSpecicalFiltrationsKeys,
	DateSpecicalFiltrationsKeysArray,
	DateStandartFiltrationsKeys,
	DateStandartFiltrationsKeysArray,
	FilterDetailsWindowProps,
	Filtrations
} from './FilterDetailsWindow.interfaces'
import { useEscKeyDown, useOutsideClick } from 'hooks'
import { CurrentFiltersItem } from '../../Filter.interfaces'
import {
	checkDateInDateArray,
	checkDifferenceExistsInTwoDateArrays
} from '../../helpers'
import { FILTER_DATE_FORMAT } from '../../constants'

/* eslint-disable no-mixed-spaces-and-tabs, indent */
const getFiltrationsList = (filter: Filter): Filtrations => {
	const standartFiltrationsKeys = filter.standartFiltrations
		? (Object.keys(
				filter.standartFiltrations
		  ) as DateStandartFiltrationsKeysArray)
		: []

	const specicalFiltrationsKeys = filter.specicalFiltrations
		? (Object.keys(
				filter.specicalFiltrations
		  ) as DateSpecicalFiltrationsKeysArray)
		: []

	return { standart: standartFiltrationsKeys, special: specicalFiltrationsKeys }
}
/* eslint-enable no-mixed-spaces-and-tabs, indent */

const getSelectOptions = (
	filtrations: Array<DateStandartFiltrationsKeys | DateSpecicalFiltrationsKeys>
) => {
	return filtrations.map((label, index) => {
		return {
			id: index,
			label: label
		}
	})
}

/* 
	TODO: On enter press in DatePickerInput form should be close
*/

const getDefaultDateValue = (
	currentFilter: CurrentFiltersItem | null
): [Date, Date] => {
	if (currentFilter === null) {
		return [getNowDateWithoutTime(), getNowDateWithoutTime()]
	}

	if (currentFilter.value instanceof Date) {
		return [currentFilter.value, currentFilter.value]
	}

	return [...currentFilter.value]
}

const getDefaultKey = (
	currentFilter: CurrentFiltersItem | null
): keyof DateStandartFiltrations | keyof DateSpecicalFiltrations | '' => {
	if (currentFilter === null) {
		return ''
	}

	return currentFilter.key
}

const getDatePickerType = (
	array: DateStandartFiltrationsKeysArray,
	current: DateStandartFiltrationsKeys | DateSpecicalFiltrationsKeys | ''
) => {
	if (includes(array, current)) return 'standart'

	return 'range'
}

function includes<T extends U, U>(
	array: ReadonlyArray<T>,
	element: U
): element is T {
	return array.includes(element as T)
}

const FilterDetailsWindow: FC<FilterDetailsWindowProps> = ({
	filter,
	currentFilter,
	onSubmit,
	onClose,
	className,
	style,
	...args
}) => {
	const [filtrations, setFiltrations] = useState<Filtrations | null>(null)
	const [currentFiltration, setCurrentFiltration] = useState<
		keyof DateStandartFiltrations | keyof DateSpecicalFiltrations | ''
	>(getDefaultKey(currentFilter))
	const [filtrationValues, setFiltrationValues] = useState<[Date, Date]>(
		getDefaultDateValue(currentFilter)
	)
	const [error, setError] = useState<boolean>(false)

	const onOutsideClick = () => {
		onClose()
	}

	const ref = useOutsideClick(onOutsideClick) as React.RefObject<HTMLDivElement>

	useEffect(() => {
		if (filter) {
			const filtrations = getFiltrationsList(filter)
			setFiltrations(filtrations)

			if (currentFiltration === '') {
				setCurrentFiltration(filtrations.standart[0])
			}
		}
		// XXX: currentFiltration
	}, [filter, currentFiltration])

	const onEscPress = useCallback(
		(e: KeyboardEvent) => {
			onClose()
		},
		[onClose]
	)

	useEscKeyDown(onEscPress, true)

	const handleDateChange = useCallback(
		(value: Date | [Date, Date]) => {
			if (value instanceof Array) {
				if (checkDifferenceExistsInTwoDateArrays(filtrationValues, value)) {
					setFiltrationValues(value)
				}

				return
			}

			if (!checkDateInDateArray(value, filtrationValues)) {
				setFiltrationValues([value, value])
			}
		},
		[filtrationValues]
	)

	const onError = useCallback((value: boolean) => {
		setError(value)
	}, [])

	if (filter === null || filtrations === null) return null

	const selectOptions = getSelectOptions([
		...filtrations.standart,
		...filtrations.special
	])

	const onSelectItemClick = (id: number) => {
		const filtration = selectOptions[id]?.label

		setCurrentFiltration(filtration)
	}

	const onDoneClick = () => {
		if (currentFiltration === '') return
		if (error) return

		if (includes(filtrations.standart, currentFiltration)) {
			onSubmit({ key: currentFiltration, value: filtrationValues[0] })
			return
		}

		onSubmit({ key: currentFiltration, value: filtrationValues })
	}

	return (
		<div
			ref={ref}
			className={classNames(
				'absolute h-26 gap-y-3 z-10 bg-white border-2 rounded-lg shadow-stone-700/20 shadow-[0_10px_60px_0_rgba(0,0,0,0.3)]',
				{
					// XXX: Move it into variable?
					'max-w-md': includes(filtrations.standart, currentFiltration),
					'max-w-lg': !includes(filtrations.standart, currentFiltration)
				},
				className
			)}
			data-testid='wrapper'
			style={style}
			{...args}
		>
			<div className='relative px-4 py-3'>
				<div className='gap-x-4 flex items-center'>
					<div className='text-lg text-gray-700' data-testid='label-text'>
						{filter.label}
					</div>
					<Select
						options={selectOptions}
						onClick={onSelectItemClick}
						defaultSelectId={selectOptions.findIndex(
							element => element.label === currentFiltration
						)}
					/>
				</div>

				<div className='flex py-4'>
					<DatePicker
						type={getDatePickerType(filtrations.standart, currentFiltration)}
						value={filtrationValues}
						onChange={handleDateChange}
						format={FILTER_DATE_FORMAT}
						onError={onError}
					/>
				</div>

				<div className='flex justify-center'>
					<button
						className={classNames(
							'h-10 px-10 rounded bg-green-500 text-white text-lg hover:bg-green-400 duration-200 black-big-focus-visible',
							{
								'bg-neutral-400 text-neutral-600': error
							}
						)}
						disabled={error}
						onClick={onDoneClick}
						data-testid='done-button'
					>
						Done
					</button>
				</div>

				<button
					className={classNames(
						'absolute top-0 right-0 translate-x-[0.8em] translate-y-[-0.8em] h-7 w-7 rounded-full bg-stone-500 text-white hover:bg-stone-400 duration-200 pink-big-focus-visible flex items-center justify-center fill-white hover:fill-stone-600 shadow-xl'
					)}
					onClick={onClose}
					data-testid='close-button'
				>
					<Cross className='fill-inherit p-[8px]' />
				</button>
			</div>
		</div>
	)
}
export default FilterDetailsWindow
