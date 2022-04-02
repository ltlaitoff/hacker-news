import React, { FC, useState } from 'react'
import classNames from 'classnames'

import { PostProps } from './Post.interfaces'

import RecordInfo from 'components/RecordInfo'
import PointsButton from '../PointsButton/PointsButton'

const Post: FC<PostProps> = ({
	points,
	title,
	url,
	objectID,
	author,
	created_at_i,
	num_comments,
	className,
	...args
}: PostProps) => {
	const [vote, setVote] = useState<boolean>(false)

	const toogleVote = () => setVote(currentVote => !currentVote)

	return (
		<div
			className={classNames(
				'grid grid-cols-[60px_auto] auto-rows-auto',
				className
			)}
			{...args}
		>
			<PointsButton vote={vote} points={points} onClick={toogleVote} />

			<div className='col-span-2 row-start-1 row-end-1'>
				<h3 className='text-slate-600 inline font-medium'>{title}</h3>{' '}
				{url && (
					<a
						className='text-stone-500 hover:text-pink-400 hover:duration-200 hover:drop-shadow-pink-400-02 inline font-light'
						href={url}
						target='_blank'
					>{`(${url})`}</a>
				)}
			</div>
			<div className='col-span-2 row-start-2 row-end-2'>
				<RecordInfo
					id={Number(objectID)}
					type='default'
					author={author}
					dateTimeStamp={created_at_i}
					onHideClick={() => {}}
					commentsCount={num_comments}
				/>
			</div>
		</div>
	)
}
export default Post
