import React, { FC, useState, useCallback } from 'react'
import Calendar from 'react-calendar'
import {
	datesNotEqual,
	isFalse,
	isNotEqual,
	isNull,
	isUndefined
} from 'helpers'
import { useOutsideClick, useEscKeyDown } from 'hooks'
import {
	DatePickerProps,
	DatePickerTypes,
	onChangeTypes
} from './DatePicker.interfaces'
import { StandartDateInput, RangeDateInput } from './components'
import { checkDatesOrder, getDefaultDateValue } from './helpers'

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
	if (isUndefined(type)) {
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

	const onSubmit = useCallback(
		(dateValues: [Date, Date], dateType: onChangeTypes) => {
			if (disabled) return

			const dateInput = checkDatesOrder(dateValues)

			if (isNotEqual(dateType, onChangeTypes.BLUR)) {
				setCalendarShow(false)
			}

			if (
				datesNotEqual(dateInput[0], date[0]) ||
				datesNotEqual(dateInput[1], date[1])
			) {
				setDate(dateInput)
			}

			if (type === DatePickerTypes.STANDART) {
				if (value instanceof Array) {
					if (
						datesNotEqual(dateInput[0], value[0]) ||
						datesNotEqual(dateInput[1], value[1])
					) {
						onChange(dateInput, dateType)
					}

					return
				}

				if (isNull(value) || datesNotEqual(dateInput[0], value)) {
					onChange(dateInput[0], dateType)
				}
				return
			}

			if (type === DatePickerTypes.RANGE) {
				if (isNull(value)) {
					onChange(dateInput, dateType)
					return
				}

				if (
					datesNotEqual(dateInput[0], value[0]) ||
					datesNotEqual(dateInput[1], value[1])
				) {
					onChange(dateInput, dateType)
				}

				return
			}
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
