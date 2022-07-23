import { ItemComment } from 'api/api.interfaces'

export interface CommentNodeProps {
	item: ItemComment
	currentLevel: number
	className?: string
}
