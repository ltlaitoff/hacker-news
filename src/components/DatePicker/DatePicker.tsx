import React, {
	FC,
	useState,
	MouseEvent as ReactMouseEvent,
	ChangeEvent,
	useCallback
} from 'react'
import classNames from 'classnames'
import Calendar from 'react-calendar'

import { isFalse, isNull, isNotEqual } from 'helpers'
import { DatePickerInputOnSubmitType } from './DatePickerInput'
import {
	DatePickerProps,
	DatePickerRangeValueWithNull,
	DatePickerStandartValueWithNull
} from './interfaces'
import { useOutsideClick, useEscKeyDown } from 'hooks'
import StandartDateInput from './components/StandartDateInput'
import RangeDateInput from './components/RangeDateInput'

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

	const onOutsideClick = () => {
		setCalendarShow(false)
	}

	const wrapperRef = useOutsideClick(onOutsideClick)

	const onEscPress = useCallback(() => setCalendarShow(false), [])

	useEscKeyDown(onEscPress, true, calendarShow)

	// TODO: Why is it here
	const checkDatesOrder = (date: [Date, Date]): [Date, Date] => {
		if (date[0] > date[1]) {
			return [date[1], date[0]]
		}

		return date
	}

	const onSubmit = (
		dateValues: [Date, Date],
		dateType: DatePickerInputOnSubmitType | 'calendar'
	) => {
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
					dateInput[0].valueOf() !== value.valueOf() ||
					dateInput[1].valueOf() !== value.valueOf()
				) {
					onChange(dateInput)
				}

				return
			}

			onChange(dateInput[0])
			return
		}

		onChange(dateInput)
	}

	const onCalendarDateChange = (
		date: Date | [Date, Date],
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (disabled) return

		setCalendarShow(false)
		onError(false)

		if (date instanceof Date) {
			onSubmit([date, date], 'calendar')
			return
		}

		onSubmit(date, 'calendar')
	}

	const onBlockClick = (e: ReactMouseEvent<HTMLDivElement>) => {
		if (disabled) return

		if (isFalse(calendarShow)) {
			setCalendarShow(true)
		}
	}

	return (
		<div
			className={classNames(className)}
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
					></Calendar>
				</div>
			)}
		</div>
	)
}

export default DatePicker
