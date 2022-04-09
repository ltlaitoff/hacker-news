import React, { FC } from 'react'
import { RecordInfoProps } from './RecordInfo.interfaces'

import { timeSince } from 'utils'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import RecordInfoDefault from './components/RecordInfoDefault'
import RecordInfoComment from './components/RecordInfoComment'
import RecordInfoButton from './components/RecordInfoButton'
import Author from './components/Author'
import TimeAgo from './components/TimeAgo'

const RecordInfo: FC<RecordInfoProps> = ({
	id,
	type,
	author,
	dateTimeStamp,
	onHideClick,
	commentsCount,
	parentId,
	storyId,
	commentLevel,
	noComments,
	className
}) => {
	const profileLink = '/profile'

	const by = type === 'default' ? 'by' : 'By'

	return (
		<div className={classNames('text-stone-400 flex gap-x-1', className)}>
			{by}
			<Author profileLink={profileLink} author={author} />
			<TimeAgo dateTimeStamp={dateTimeStamp} />

			{'|'}
			<RecordInfoButton text='hide' onClick={onHideClick} />

			{type === 'default' ? (
				<RecordInfoDefault
					id={id}
					commentsCount={commentsCount}
					noComments={Boolean(noComments)}
				/>
			) : (
				<RecordInfoComment
					parentId={parentId}
					storyId={storyId}
					level={commentLevel}
				/>
			)}
		</div>
	)
}

export default RecordInfo
