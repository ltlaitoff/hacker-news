import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

// @ts-ignore
import { PostProps } from './Post.interfaces.tsx'
import PostButtons from './components/PostButtons'

import { timeSince } from 'utils'

const Post: FC<PostProps> = ({ data, className }: PostProps) => {
	const [vote, setVote] = useState<boolean>(false)

	const toogleVote = () => setVote(currentVote => !currentVote)

	const commentsLink = '/comments'
	const profileLink = '/profile'

	const timeAgo: string = timeSince(data?.created_at_i)
	const TimeAgo = () => (
		<Link className='hover:text-pink-400 hover:duration-200' to={commentsLink}>
			{timeAgo}
		</Link>
	)

	const author = data.author
	const Author = () => (
		<Link
			className='hover:text-pink-400 hover:duration-200 text-sky-500 drop-shadow-sky-400-01 hover:drop-shadow-pink-400-02'
			to={profileLink}
		>
			{author}
		</Link>
	)

	return (
		<div
			className={classNames(
				'grid grid-cols-[60px_auto] grid-rows-2',
				className
			)}
		>
			<button
				className={classNames(
					'row-span-full hover:text-pink-400 hover:duration-200 col-span-1 drop-shadow-md ',
					vote
						? 'text-pink-400 hover:drop-shadow-sky-400 hover:text-sky-400 font-medium'
						: 'text-stone-400 hover:drop-shadow-pink-400 '
				)}
				onClick={toogleVote}
			>
				<div>▲</div>
				<div>{data.points + (vote ? 1 : 0)}</div>
			</button>

			<div className='gap-x-1 flex col-span-2 row-start-1 row-end-1'>
				<h3 className='text-slate-600 font-medium'>{data.title}</h3>

				{data.url && (
					<a
						className='text-stone-500 hover:text-pink-400 hover:duration-200 hover:drop-shadow-pink-400-02 font-light'
						href={data.url}
						target='_blank'
					>{`(${data.url})`}</a>
				)}
			</div>
			<div className='text-stone-400 col-span-2 row-start-2 row-end-2'>
				by <Author />
				<TimeAgo />
				<PostButtons
					className='123'
					onHideClick={() => {}}
					commentsCount={data.num_comments}
					commentsLink={commentsLink}
				/>
			</div>
		</div>
	)
}
export default Post
