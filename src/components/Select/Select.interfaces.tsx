export type SelectRecord = {
	id: number
	label: string
}

export interface SelectProps {
	options: SelectRecord[]
<<<<<<< HEAD
	onClick?: (id: number) => void
	onChange?: (id: number) => void
	disabled?: boolean
	defaultSelectId?: number
	shadowDisabled?: boolean
	shadowBaseDisabled?: boolean
	shadowListDisabled?: boolean
=======
	onClick: (id: number) => void
	onChange: (id: number) => void
	disabled?: boolean
	defaultSelectId?: number
>>>>>>> main
	className?: string
}
