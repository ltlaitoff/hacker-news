export interface FilterItemButtonProps {
	id: number
	name: string
	filterKey: string
	value: Date | [Date, Date]
	onClose: (id: number) => void
	onClick: (id: number) => void
	className?: string
}
