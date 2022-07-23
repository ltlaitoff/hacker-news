import React, { FC, useState } from 'react'
import { CommentHideButton, Comments } from '..'
import Comment from 'components/Comment'
import { CommentNodeProps } from './CommentNode.interfaces'
import classNames from 'classnames'

const CommentNode: FC<CommentNodeProps> = ({
	item,
	currentLevel,
	className,
	...args
}) => {
	const [commentsHidden, setCommentsHidden] = useState<boolean>(
		item.children.length === 0
	)

	const [commentNodeHidden, setCommentNodeHidden] = useState<boolean>(false)

	const toogleCommentsHidden = () => {
		setCommentsHidden(currentCommentsHidden => !currentCommentsHidden)
	}

	let author = item.author
	let text = item.text

	if (author === null || text === null) {
		return null
	}

	if (commentNodeHidden) {
		return null
	}

	return (
		<div key={item.id} className={className} {...args}>
			<div
				className={classNames('flex gap-x-2 items-start')}
				style={{ marginLeft: currentLevel * 35 }}
			>
				<CommentHideButton
					className='mt-1'
					commentsNotHidden={commentsHidden}
					onClick={toogleCommentsHidden}
				/>
				<Comment
					comment_text={text}
					showPoints={false}
					points={0}
					objectID={String(item.id)}
					author={author}
					created_at_i={item.created_at_i}
					parent_id={item.parent_id}
					story_id={item.story_id}
					onHideClick={() => setCommentNodeHidden(true)}
					level={currentLevel}
				/>
			</div>

			{!commentsHidden && (
				<Comments
					className={`ml-${currentLevel + '0'}`}
					comments={item.children}
					level={currentLevel + 1}
				/>
			)}
		</div>
	)
}

export default CommentNode
