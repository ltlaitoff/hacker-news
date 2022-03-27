export interface PostButtonsProps {
	vote: boolean
	onUnVoteClick: () => void
	onHideClick: () => void
	commentsCount: number
	commentsLink: string
	className?: string
}
