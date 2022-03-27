import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

// @ts-ignore
import { PostProps } from './Post.interfaces.tsx'
import PostButtons from './components/PostButtons'

import { timeSince } from 'utils'

const Post: FC<PostProps> = ({ data, index }: PostProps) => {
	const [vote, setVote] = useState<boolean>(false)

	const toogleVote = () => setVote(currentVote => !currentVote)

	const points = `${data.points} point${data.points > 1 ? 's' : ''} by`
	const commentsLink = '/comments'

	const timeAgo = timeSince(data.created_at_i)
	const TimeAgo = () => (
		<Link className='hover:text-pink-400 hover:duration-200' to={commentsLink}>
			{timeAgo}
		</Link>
	)

	const author = data.author
	const Author = () => (
		<Link className='hover:text-pink-400 hover:duration-200 ' to='/profile'>
			{` ${author} `}
		</Link>
	)

	return (
		<div className='grid grid-cols-[30px_30px_1fr] grid-rows-2'>
			<div className='text-stone-400 col-start-1 col-end-1 row-start-1 row-end-1'>
				{index}.
			</div>
			<div className='col-start-2 col-end-2 row-start-1 row-end-1'>
				{vote === false && (
					<button
						className='text-stone-400 hover:text-pink-400 hover:duration-200'
						onClick={toogleVote}
					>
						▲
					</button>
				)}
			</div>
			<div className='col-start-3 col-end-3 row-start-1 row-end-1'>
				{data.title}{' '}
				{data.url && (
					<a
						className='text-stone-500 hover:text-pink-400 hover:duration-200'
						href={data.url}
					>{`(${data.url})`}</a>
				)}
			</div>
			<div className='text-stone-400 col-start-3 col-end-3 row-start-2 row-end-2'>
				{points}
				<Author />
				<TimeAgo />
				<PostButtons
					className='123'
					vote={vote}
					onUnVoteClick={toogleVote}
					onHideClick={() => {}}
					commentsCount={data.num_comments}
					commentsLink={commentsLink}
				/>
			</div>
		</div>
	)
}
export default Post
