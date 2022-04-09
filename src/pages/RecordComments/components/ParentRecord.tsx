import React, { useState, FC } from 'react'
import { ItemStory } from 'api/api.interfaces'
import Post from 'components/Post'

import { ItemComment } from '../../../api/api.interfaces'
import Comment from 'components/Comment'

interface ParentRecordProps {
	data: ItemStory | ItemComment
	className?: string
}

const ParentRecord: FC<ParentRecordProps> = ({ data, className, ...args }) => {
	const [vote, setVote] = useState(false)

	const toogleVote = () => setVote(v => !v)

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
		/>
	)
}

export default ParentRecord
