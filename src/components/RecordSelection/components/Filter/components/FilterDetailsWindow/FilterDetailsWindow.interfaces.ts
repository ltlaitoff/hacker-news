import { CSSProperties } from 'react'
import { FilterReceived, FilterTemplate } from 'typescript'

export interface FilterDetailsWindowProps {
	filter: FilterTemplate
	currentFilter: FilterReceived | null
	onSubmit: (value: FilterReceived) => void
	onClose: () => void
	className?: string
	style?: CSSProperties
}
