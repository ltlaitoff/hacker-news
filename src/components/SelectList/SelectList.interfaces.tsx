export type SelectRecord = {
	id: number
	label: string
}

export interface SelectListProps {
	show: Boolean
	options: SelectRecord[]
	onItemClick: (item: SelectRecord) => void
	selectedItem?: SelectRecord
	shadowDisabled?: boolean
	className?: string
}
