import { CSSProperties } from 'react'

export type SelectRecord = {
	id: number
	label: string
}

export interface SelectListProps {
	options: SelectRecord[]
	onItemClick: (item: SelectRecord) => void
	onOutsideClick: () => void
	selectedItem?: SelectRecord
	shadowDisabled?: boolean
	className?: string
	style?: CSSProperties
}
