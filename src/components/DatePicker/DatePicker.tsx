import React, { FC, useState, useCallback } from 'react'
import Calendar from 'react-calendar'

import { isFalse, isNull, isNotEqual } from 'helpers'
import { useOutsideClick, useEscKeyDown } from 'hooks'

import {
	DatePickerProps,
	DatePickerRangeValueWithNull,
	DatePickerStandartValueWithNull,
	onChangeTypes
} from './DatePicker.interfaces'

import { StandartDateInput, RangeDateInput } from './components'

const getDefaultDateValue = (
	value: DatePickerStandartValueWithNull | DatePickerRangeValueWithNull
): [Date, Date] => {
	const currentDate = new Date(Date.now())

	if (isNull(value)) {
		return [currentDate, currentDate]
	}

	if (value instanceof Array) {
		if (isNull(value[0]) || isNull(value[1])) {
			return [currentDate, currentDate]
		}

		return value
	}

	return [value, value]
}

/*
	BUG: On click on date in calendar error not reset
*/

const DatePicker: FC<DatePickerProps> = ({
	value,
	onChange,
	type,
	disabled,
	format = 'dd-MM-Y',
	onError,
	className,
	...args
}: DatePickerProps) => {
	if (type === undefined) {
		type = 'standart'
	}

	const [date, setDate] = useState<[Date, Date]>(getDefaultDateValue(value))
	const [calendarShow, setCalendarShow] = useState<boolean>(false)

	const setCalendarShowFalse = useCallback(() => {
		setCalendarShow(false)
	}, [])

	const wrapperRef = useOutsideClick(
		setCalendarShowFalse
	) as React.RefObject<HTMLDivElement>

	useEscKeyDown(setCalendarShowFalse, true, calendarShow)

	// XXX: Why is it here
	const checkDatesOrder = (date: [Date, Date]): [Date, Date] => {
		if (date[0] > date[1]) {
			return [date[1], date[0]]
		}

		return date
	}

	const onSubmit = useCallback(
		(dateValues: [Date, Date], dateType: onChangeTypes) => {
			if (disabled) return

			const dateInput = checkDatesOrder(dateValues)

			if (isNotEqual(dateType, 'blur')) {
				setCalendarShow(false)
			}

			if (
				dateInput[0].valueOf() !== date[0].valueOf() ||
				dateInput[1].valueOf() !== date[1].valueOf()
			) {
				setDate(dateInput)
			}

			if (type === 'standart') {
				if (value instanceof Array) {
					if (
						// XXX: Check it of errors
						dateInput[0].valueOf() !== value.valueOf() ||
						dateInput[1].valueOf() !== value.valueOf()
					) {
						onChange(dateInput, dateType)
					}

					return
				}

				onChange(dateInput[0], dateType)
				return
			}

			onChange(dateInput, dateType)
		},
		[disabled, date, onChange, type, value]
	)

	const onCalendarDateChange = useCallback(
		(date: Date | [Date, Date]) => {
			if (disabled) return

			setCalendarShow(false)
			onError(false)

			if (date instanceof Date) {
				onSubmit([date, date], onChangeTypes.CALENDAR)
				return
			}

			onSubmit(date, onChangeTypes.CALENDAR)
		},
		[disabled, onError, onSubmit]
	)

	const onBlockClick = useCallback(() => {
		if (disabled) return

		if (isFalse(calendarShow)) {
			setCalendarShow(true)
		}
	}, [disabled, calendarShow])

	return (
		<div
			className={className}
			onClick={onBlockClick}
			ref={wrapperRef}
			data-testid='picker'
			{...args}
		>
			{type === 'standart' ? (
				<StandartDateInput
					date={date}
					format={format}
					onSubmit={onSubmit}
					disabled={disabled}
					onError={onError}
					data-testid='standart-input'
				/>
			) : (
				<RangeDateInput
					date={date}
					format={format}
					onSubmit={onSubmit}
					onError={onError}
					disabled={disabled}
				/>
			)}

			{calendarShow && !disabled && (
				<div className='absolute' data-testid='calendar'>
					<Calendar
						onChange={onCalendarDateChange}
						value={type === 'range' ? date : date[0]}
						selectRange={type === 'range'}
					/>
				</div>
			)}
		</div>
	)
}

export default React.memo(DatePicker)
