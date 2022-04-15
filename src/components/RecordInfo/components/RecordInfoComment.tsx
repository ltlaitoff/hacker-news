import React, { FC, Component } from 'react'
import RecordInfoButton from './RecordInfoButton'
import { RecordInfoCommentProps } from './RecordInfoComment.interfaces'

const RecordInfoComment: FC<RecordInfoCommentProps> = ({
	parentId,
	storyId,
	level,
	className,
	...args
}) => {
	if (level === -1) return null

	return (
		<div className={className} {...args}>
			{parentId && (
				<>
					{' | '}
					<RecordInfoButton text={'parent'} href={`#${parentId}`} />
				</>
			)}
			{level > 1 && storyId && (
				<>
					{' | '}
					<RecordInfoButton text={'root'} href={`#${storyId}`} />
				</>
			)}
		</div>
	)
}

export default RecordInfoComment
