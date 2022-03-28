import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { PostButtonsProps } from './PostButtons.interfaces'

import classnames from 'classnames'

/* 
  On input: 
  vote: boolean
  onUnVoteClick: function
  onHideClick: function
  commentsCount: number
  commentsLink: string

  Должно быть:
  If vote - button unvote, generate callback onUnVoteClick
  Button hide - generate onHideClick
  Link comments - open comments page
*/

const PostButtons: FC<PostButtonsProps> = ({
	onHideClick,
	commentsCount,
	commentsLink,
	className,
	...args
}: PostButtonsProps) => {
	const commentsCountText: string =
		commentsCount > 0
			? `${commentsCount} comment${commentsCount > 1 ? 's' : ''}`
			: 'discuss'

	return (
		<div className={classnames('inline ', className)} {...args}>
			{' | '}
			<button
				className='hover:text-pink-400 hover:duration-200'
				onClick={onHideClick}
			>
				hide
			</button>

			{' | '}
			<Link
				to={commentsLink}
				className='hover:text-pink-400 hover:duration-200'
			>
				{commentsCountText}
			</Link>
		</div>
	)
}

export default PostButtons
