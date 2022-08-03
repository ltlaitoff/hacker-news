import React, { FC } from 'react'
import DatePicker from 'components/DatePicker'
import NumberPicker from 'components/NumberPicker'
import Select from 'components/Select'
import { FilterBaseType } from 'typescript/filters'
import { FILTER_DATE_FORMAT } from '../../constants'
import { transformArrayToOptions } from '../../helpers'
import { FilterValuePickerProps } from './FilterValuePicker.interfaces'
import StringPicker from 'components/StringPicker'

const FilterValuePicker: FC<FilterValuePickerProps> = ({
	filter,
	onError,
	onChange
}) => {
	switch (filter.type) {
		case FilterBaseType.DATE:
			return (
				<div className='flex py-4'>
					{filter.value instanceof Array ? (
						<DatePicker
							type='range'
							value={filter.value}
							onChange={onChange}
							format={FILTER_DATE_FORMAT}
							onError={onError}
						/>
					) : (
						<DatePicker
							type='standart'
							value={filter.value}
							onChange={onChange}
							format={FILTER_DATE_FORMAT}
							onError={onError}
						/>
					)}
				</div>
			)

		case FilterBaseType.NUMBER:
			return (
				<div className='flex py-4'>
					{filter.value instanceof Array ? (
						<NumberPicker
							type='range'
							value={filter.value}
							onChange={onChange}
							aboveZero={true}
							onError={onError}
						/>
					) : (
						<NumberPicker
							type='standart'
							value={filter.value}
							onChange={onChange}
							aboveZero={true}
							onError={onError}
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

export default FilterValuePicker
