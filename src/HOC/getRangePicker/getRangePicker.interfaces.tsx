import { DatePickerProps } from 'components/DatePicker'
import { NumberPickerProps } from 'components/NumberPicker'

export type PickersProps1 = NumberPickerProps | DatePickerProps
export type PickersProps = Omit<PickersProps1, 'value'> & {
	value: Exclude<PickersProps1['value'], null>
}

export type RangePickerProps<Type extends PickersProps> = Omit<
	Type,
	'value' | 'onChange'
> & {
	value: [Type['value'], Type['value']]
	onChange: RangeOnChange<Type>
}

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
	? A
	: never

export type RangeOnChange<T extends PickersProps> = (
	value: [ArgumentTypes<T['onChange']>[0], ArgumentTypes<T['onChange']>[0]]
) => void
