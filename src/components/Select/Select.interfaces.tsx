export type SelectRecord = {
	id: number
	label: string
}

export interface SelectProps {
	options: SelectRecord[]
	onClick: (id: number) => void
	onChange: (id: number) => void
	disabled?: boolean
	defaultSelectId?: number
	className?: string
}
