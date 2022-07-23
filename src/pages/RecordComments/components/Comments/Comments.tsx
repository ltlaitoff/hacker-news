import React, { FC } from 'react'
import classNames from 'classnames'
import { CommentsProps } from './Comments.interfaces'
import { CommentNode } from '..'

const Comments: FC<CommentsProps> = ({
	comments,
	level,
	className,
	...args
}) => {
	let currentLevel = level ?? 0

	return (
		<div className={classNames('flex flex-col', className)} {...args}>
			{comments.map(item => (
				<CommentNode
					key={item.id}
					item={item}
					currentLevel={currentLevel}
					className='mt-1.5 mb-1.5'
				/>
			))}
		</div>
	)
}

export default Comments
