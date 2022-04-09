export interface PostProps {
	points: number
	title: string
	url?: string
	objectID: string
	author: string
	created_at_i: number
	num_comments: number
	noComments?: boolean
	className?: string
}
