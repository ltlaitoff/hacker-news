export type SelectRecord = {
	id: number
	label: string
}

export interface SelectProps {
	options: SelectRecord[]
	onClick?: (id: number) => void
	onChange?: (id: number) => void
	disabled?: boolean
	defaultSelectId?: number
	shadowDisabled?: boolean
	shadowBaseDisabled?: boolean
	shadowListDisabled?: boolean
	className?: string
}
