import { FilterReceived } from 'typescript'

export type FilterItemButtonProps = FilterReceived & {
	onClose: (id: number) => void
	onClick: (id: number) => void
	className?: string
}
