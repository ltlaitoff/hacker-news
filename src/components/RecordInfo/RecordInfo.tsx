import React, { FC } from 'react'
import { RecordInfoProps } from './RecordInfo.interfaces'

import { timeSince } from 'utils'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const RecordInfo: FC<RecordInfoProps> = ({
	type,
	author,
	dateTimeStamp,
	onHideClick,
	commentsCount,
	parentId,
	className
}) => {
	const profileLink = '/profile'

	const timeAgo: string = timeSince(dateTimeStamp)

	const SecondButton = () => {
		let to: string = ''
		let text: string = ''

		if (type === 'default') {
			const comentsCountNumber = Number(commentsCount)
			to = '/comments'
			text =
				comentsCountNumber > 0
					? `${commentsCount} comment${comentsCountNumber > 1 ? 's' : ''}`
					: 'discuss'
		} else {
			to = '/'
			text = 'parent'
		}

		return (
			<Link to={to} className='hover:text-pink-400 hover:duration-200'>
				{text}
			</Link>
		)
	}

	return (
		<div className={classNames('text-stone-400', className)}>
			{type === 'default' ? 'by' : 'By'}{' '}
			<Link
				className='hover:text-pink-400 hover:duration-200 text-sky-500 drop-shadow-sky-400-01 hover:drop-shadow-pink-400-02'
				to={profileLink}
			>
				{author}
			</Link>{' '}
			{timeAgo}
			{' | '}
			<button
				className='hover:text-pink-400 hover:duration-200'
				onClick={onHideClick}
			>
				hide
			</button>
			{' | '}
			<SecondButton />
		</div>
	)
}

export default RecordInfo
