import React, { FC, useState, useCallback } from 'react'
import Calendar from 'react-calendar'

import { isFalse, isNotEqual } from 'helpers'
import { useOutsideClick, useEscKeyDown } from 'hooks'

import {
	DatePickerProps,
	DatePickerTypes,
	onChangeTypes
} from './DatePicker.interfaces'

import { StandartDateInput, RangeDateInput } from './components'
import { getDefaultDateValue } from './helpers'

const DatePicker: FC<DatePickerProps> = ({
	type,
	value,
	onChange,
	error,
	onError,
	disabled,
	format = 'dd-MM-Y',
	className,
	...args
}: DatePickerProps) => {
	if (type === undefined) {
		type = DatePickerTypes.STANDART
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

			if (isNotEqual(dateType, onChangeTypes.BLUR)) {
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
			{type === DatePickerTypes.STANDART ? (
				<StandartDateInput
					format={format}
					date={date}
					onSubmit={onSubmit}
					error={error}
					onError={onError}
					disabled={disabled}
					data-testid='standart-input'
				/>
			) : (
				<RangeDateInput
					format={format}
					date={date}
					onSubmit={onSubmit}
					error={error}
					onError={onError}
					disabled={disabled}
				/>
			)}

			{calendarShow && !disabled && (
				<div className='absolute' data-testid='calendar'>
					<Calendar
						onChange={onCalendarDateChange}
						value={type === DatePickerTypes.RANGE ? date : date[0]}
						selectRange={type === DatePickerTypes.RANGE}
					/>
				</div>
			)}
		</div>
	)
}

export default React.memo(DatePicker)
