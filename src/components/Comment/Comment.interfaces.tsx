export interface CommentProps {
	comment_text: string
	points: number
	objectID: string
	author: string
	created_at_i: number
	parent_id: number
	story_id: number
	level: number
	className?: string
}
