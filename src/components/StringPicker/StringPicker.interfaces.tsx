export interface StringPickerProps {
	value?: string
	onChange: (value: string) => void
	onError?: (value: boolean) => void
	disabled?: boolean
	className?: string
}
