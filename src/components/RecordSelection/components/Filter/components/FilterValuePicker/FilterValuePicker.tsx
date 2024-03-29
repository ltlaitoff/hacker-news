import React, { FC } from 'react'
import DatePicker, { DatePickerTypes } from 'components/DatePicker'
import { NumberPicker, NumberPickerRange } from 'components/NumberPicker'
import Select from 'components/Select'
import { FilterBaseType } from 'typescript/filters'
import { FILTER_DATE_FORMAT } from '../../constants'
import { transformArrayToOptions } from '../../helpers'
import { FilterValuePickerProps } from './FilterValuePicker.interfaces'
import StringPicker from 'components/StringPicker'
import { NUMBER_PICKER } from './FilterValuePicker.constants'

const FilterValuePicker: FC<FilterValuePickerProps> = ({
	filter,
	onError,
	error,
	onChange
}) => {
	switch (filter.type) {
		case FilterBaseType.DATE:
			return (
				<div className='flex py-4'>
					{filter.value instanceof Array ? (
						<DatePicker
							type={DatePickerTypes.RANGE}
							value={filter.value}
							onChange={onChange}
							error={error}
							onError={onError}
							format={FILTER_DATE_FORMAT}
						/>
					) : (
						<DatePicker
							type={DatePickerTypes.STANDART}
							value={filter.value}
							onChange={onChange}
							error={error}
							onError={onError}
							format={FILTER_DATE_FORMAT}
						/>
					)}
				</div>
			)

		case FilterBaseType.NUMBER:
			return (
				<div className='flex py-4'>
					{filter.value instanceof Array ? (
						<NumberPickerRange
							value={filter.value}
							onChange={onChange}
							error={error}
							onError={onError}
							max={NUMBER_PICKER.max}
							min={NUMBER_PICKER.min}
						/>
					) : (
						<NumberPicker
							value={filter.value}
							onChange={onChange}
							error={error}
							onError={onError}
							max={NUMBER_PICKER.max}
							min={NUMBER_PICKER.min}
						/>
					)}
				</div>
			)

		case FilterBaseType.LIST: {
			const onSelectItemClick = (filterId: number) => {
				const value = filter.listValues[filterId]
				onChange(value)
			}

			return (
				<div className='flex py-4'>
					<Select
						options={transformArrayToOptions(filter.listValues)}
						onClick={onSelectItemClick}
					/>
				</div>
			)
		}

		case FilterBaseType.STRING: {
			return (
				<div className='flex py-4'>
					<StringPicker value={filter.value} onChange={onChange} />
				</div>
			)
		}
	}
}

export default React.memo(FilterValuePicker)
