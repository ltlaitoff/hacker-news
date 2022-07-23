import React, { FC } from 'react'
import Post from 'components/Post'
import Comment from 'components/Comment'
import { ParentRecordProps } from './ParentRecord.interfaces'

const ParentRecord: FC<ParentRecordProps> = ({ data, className, ...args }) => {
	if (data.type === 'story') {
		return (
			<Post
				points={data.points}
				title={data.title}
				url={data.url}
				objectID={String(data.id)}
				author={data.author}
				created_at_i={data.created_at_i}
				num_comments={0}
				noComments={true}
				className='mb-14'
				{...args}
			/>
		)
	}

	return (
		<Comment
			comment_text={data.text ? data.text : ''}
			points={0}
			objectID={String(data.id)}
			author={data.author}
			created_at_i={data.created_at_i}
			parent_id={data.parent_id}
			story_id={data.story_id}
			level={-1}
			{...args}
		/>
	)
}

export default ParentRecord
