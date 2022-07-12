import { CSSProperties } from 'react'

export type ListRecord = {
	id: number
	label: string
}

export interface ListProps {
	options: ListRecord[]
	onItemClick: (item: ListRecord) => void
	onOutsideClick: () => void
	selectedItem?: ListRecord
	shadowDisabled?: boolean
	className?: string
	style?: CSSProperties
}
