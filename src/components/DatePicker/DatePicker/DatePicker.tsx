import React, {
	FC,
	useState,
	MouseEvent as ReactMouseEvent,
	ChangeEvent
} from 'react'
import classNames from 'classnames'
import Calendar from 'react-calendar'

import { isEscapeKey, isFalse, isNull, isNotEqual } from 'helpers'
import DatePickerInput, {
	DatePickerInputOnSubmitType
} from '../DatePickerInput'
import { DatePickerProps, DatePickerValue } from '../interfaces'
import { useOutsideClick, useKeyDown } from 'hooks'

const getDefaultDateValue = (value: DatePickerValue): Date => {
	if (isNull(value)) return new Date(Date.now())
	if (value instanceof Array) return value[0]

	return value
}

const DatePicker: FC<DatePickerProps> = ({
	value,
	onChange,
	disabled,
	format = 'dd-MM-Y',
	className,
	...args
}) => {
	const [date, setDate] = useState<Date>(getDefaultDateValue(value))
	const [calendarShow, setCalendarShow] = useState<boolean>(false)

	const onOutsideClick = () => {
		setCalendarShow(false)
	}

	const wrapperRef = useOutsideClick(onOutsideClick)

	const onEscPress = (e: KeyboardEvent) => {
		if (isEscapeKey(e.key) && calendarShow) {
			setCalendarShow(false)
		}
	}

	useKeyDown(onEscPress)

	const onSubmit = (
		date: Date,
		type: DatePickerInputOnSubmitType | 'calendar'
	) => {
		if (disabled) return

		setDate(date)

		if (isNotEqual(type, 'blur')) {
			setCalendarShow(false)
		}

		if (value instanceof Array) {
			onChange([date, date])
			return
		}

		onChange(date)
	}

	const onCalendarDateChange = (
		date: Date,
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (disabled) return

		setCalendarShow(false)
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
			<DatePickerInput
				date={date}
				format={format}
				onSubmit={onSubmit}
				disabled={disabled}
				data-testid='input'
			/>

			{calendarShow && !disabled && (
				<div className='absolute' data-testid='calendar'>
					<Calendar onChange={onCalendarDateChange} value={date}></Calendar>
				</div>
			)}
		</div>
	)
}

export default DatePicker
