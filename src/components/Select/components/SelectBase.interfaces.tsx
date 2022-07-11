import { SelectRecord } from '../Select.interfaces'

export interface SelectBaseProps {
	onClick: () => void
	listIsOpened: boolean
	selectedItem: SelectRecord
	disabled?: boolean
	shadowDisabled?: boolean
	className?: string
}
