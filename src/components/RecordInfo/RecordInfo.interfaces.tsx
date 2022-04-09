type Types = 'default' | 'comment'

interface MandatoryProps {
	id: number
	author: string
	dateTimeStamp: number
	onHideClick: () => void
	className?: string
}

interface Default extends MandatoryProps {
	type: 'default'
	commentsCount: number | null
	noComments?: boolean
	parentId?: never
	storyId?: never
	commentLevel?: never
}

interface Comment extends MandatoryProps {
	type: 'comment'
	parentId: number | null
	storyId: number | null
	commentLevel: number
	commentsCount?: never
	noComments?: never
}

export type RecordInfoProps = Default | Comment
