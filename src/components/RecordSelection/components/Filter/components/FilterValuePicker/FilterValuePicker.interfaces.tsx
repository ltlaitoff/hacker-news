import { FilterReceived } from 'typescript/filters'

export interface FilterValuePickerProps {
	filter: FilterReceived
	onError: (value: boolean) => void
	onChange: (value: FilterReceived['value']) => void
	className?: string
}
