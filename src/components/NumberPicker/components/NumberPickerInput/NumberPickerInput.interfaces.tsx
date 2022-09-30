import { onChangeType } from '../../NumberPicker.interfaces'

export type onSubmitChangeTypeType = Exclude<
	onChangeType,
	onChangeType.INTERVAL
>
export { onChangeType as onSubmitChangeType }

export interface NumberPickerInputProps {
	value: number
	onSubmit: (value: number, type: onSubmitChangeTypeType) => void
	error: boolean
	onError: (value: boolean) => void
	disabled?: boolean
	max: number
	min: number
	className?: string
}
