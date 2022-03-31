type Types = 'default' | 'comment'

interface MandatoryProps {
	author: string
	dateTimeStamp: number
	onHideClick: () => void
	className?: string
}

interface Default extends MandatoryProps {
	type: 'default'
	commentsCount: number | null
	parentId?: never
}

interface Comment extends MandatoryProps {
	type: 'comment'
	parentId: number | null
	commentsCount?: never
}

export type RecordInfoProps = Default | Comment
