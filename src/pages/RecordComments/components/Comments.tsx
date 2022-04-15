import React, { FC } from 'react'
import { ItemComment } from 'api/api.interfaces'
import Comment from 'components/Comment'
import classNames from 'classnames'

interface CommentsProps {
	comments: ItemComment[]
	level?: number
	className?: string
}

const commentClassNames: Record<number, string> = {
	0: 'pl-0',
	1: 'pl-14',
	2: 'pl-28',
	3: 'pl-42',
	4: 'pl-56',
	5: 'pl-70',
	6: 'pl-84',
	7: 'pl-98',
	8: 'pl-112',
	9: 'pl-126',
	10: 'pl-140'
}

const Comments: FC<CommentsProps> = ({
	comments,
	level,
	className,
	...args
}) => {
	let currentLevel = level ? level : 0

	return (
		<div className={classNames('flex flex-col gap-y-3', className)} {...args}>
			{comments.map(item => {
				let author = item.author
				let text = item.text

				if (author === null) {
					author = 'deleted'
				}

				if (text === null) {
					text = 'deleted'
				}

				const classNameComment = commentClassNames[currentLevel]
					? commentClassNames[currentLevel]
					: 'pl-44'

				return (
					<div key={item.id}>
						<Comment
							comment_text={text}
							showPoints={false}
							points={0}
							objectID={String(item.id)}
							author={author}
							created_at_i={item.created_at_i}
							parent_id={item.parent_id}
							story_id={item.story_id}
							level={currentLevel}
							className={classNameComment}
						/>

						<Comments
							className={`ml-${currentLevel + '0'}`}
							comments={item.children}
							level={currentLevel + 1}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default Comments
