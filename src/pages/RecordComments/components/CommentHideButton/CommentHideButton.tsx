import classNames from 'classnames'
import React, { FC } from 'react'
import { CommentHideButtonProps } from './CommentHideButton.interfaces'

const CommentHideButton: FC<CommentHideButtonProps> = ({
	commentsNotHidden,
	onClick,
	className,
	...args
}) => {
	return (
		<button
			className={classNames(
				'pink-hover row-start-1 row-end-3 col-span-1 self-start ',
				'text-stone-400 pink-hover ',
				className
			)}
			onClick={onClick}
			{...args}
		>
			{commentsNotHidden ? '►' : '▼'}
		</button>
	)
}

export default CommentHideButton
