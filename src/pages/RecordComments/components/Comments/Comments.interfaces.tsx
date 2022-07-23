import { ItemComment } from 'api/api.interfaces'

export interface CommentsProps {
	comments: ItemComment[]
	level?: number
	className?: string
}
