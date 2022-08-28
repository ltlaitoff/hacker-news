import React, { ComponentType } from 'react'
import { RangePickerProps, PickersProps } from './getRangePicker.interfaces'

/*
	Tests:
	RangePickerHOC with value = [$fistValue, $secondValue] should render two components: first with value = $fistValue, second with value = $secondValue
	RangePickerHOC with value = [100, 100] and onChange = function
		On call onChange on first component with value = $value, RangePickerHOC onChange should be called with [$value, 100]
		On call onChange on second component with value = $value, RangePickerHOC onChange should be called with [100, $value]
	Custom prop data-hello = "1" should be on both components 
*/

function getRangePicker<T extends PickersProps>(Component: ComponentType<T>) {
	const RangePickerHOC = ({
		value,
		onChange,
		...props
	}: RangePickerProps<T>) => {
		const onFirstChange: T['onChange'] = (
			currentValue: Parameters<T['onChange']>[0]
		) => {
			onChange([currentValue, value[1]])
		}

		const onSecondChange: T['onChange'] = (
			currentValue: Parameters<T['onChange']>[0]
		) => {
			onChange([value[0], currentValue])
		}

		const firstComponentProps = {
			value: value[0],
			onChange: onFirstChange,
			...props
		} as T

		const secondComponentProps = {
			value: value[1],
			onChange: onSecondChange,
			...props
		} as T

		return (
			<div className='gap-x-4 justify-items-end flex'>
				<Component {...firstComponentProps} />
				<div className='self-center'>and</div>
				<Component {...secondComponentProps} />
			</div>
		)
	}

	return React.memo(RangePickerHOC)
}

export default getRangePicker
