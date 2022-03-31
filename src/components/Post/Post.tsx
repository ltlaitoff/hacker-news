import React, { FC, useState } from 'react'
import classNames from 'classnames'

import { PostProps } from './Post.interfaces'

import RecordInfo from 'components/RecordInfo'
import PointsButton from '../PointsButton/PointsButton'

const Post: FC<PostProps> = ({ data, className }: PostProps) => {
	const [vote, setVote] = useState<boolean>(false)

	const toogleVote = () => setVote(currentVote => !currentVote)

	return (
		<div
			className={classNames(
				'grid grid-cols-[60px_auto] auto-rows-auto',
				className
			)}
		>
			<PointsButton vote={vote} points={data.points} onClick={toogleVote} />

			<div className='col-span-2 row-start-1 row-end-1'>
				<h3 className='text-slate-600 inline font-medium'>{data.title}</h3>{' '}
				{data.url && (
					<a
						className='text-stone-500 hover:text-pink-400 hover:duration-200 hover:drop-shadow-pink-400-02 inline font-light'
						href={data.url}
						target='_blank'
					>{`(${data.url})`}</a>
				)}
			</div>
			<div className='col-span-2 row-start-2 row-end-2'>
				<RecordInfo
					type='default'
					author={data.author}
					dateTimeStamp={data.created_at_i}
					onHideClick={() => {}}
					commentsCount={data.num_comments}
				/>
			</div>
		</div>
	)
}
export default Post
