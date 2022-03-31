import React, { FC, useState } from 'react'
import { CommentProps } from './Comment.interfaces'

import classNames from 'classnames'

import RecordInfo from 'components/RecordInfo'
import PointsButton from '../PointsButton/PointsButton'

import ReactHtmlParser, {
	HTMLReactParserOptions,
	DOMNode,
	Element
} from 'html-react-parser'

const Comment: FC<CommentProps> = ({ data, className }: CommentProps) => {
	const [vote, setVote] = useState<boolean>(false)

	const toogleVote = () => setVote(currentVote => !currentVote)

	if (data.comment_text === null) return null

	const commentText = data.comment_text.split('\\n').join('<br />')

	const options: HTMLReactParserOptions = {
		replace: (domNode: DOMNode) => {
			if (domNode instanceof Element && domNode.name === 'a') {
				return (
					<a
						className='hover:text-pink-400 hover:duration-200 text-sky-500 drop-shadow-sky-400-01 hover:drop-shadow-pink-400-02'
						href={domNode.attribs.href}
						rel={domNode.attribs.rel}
					>
						{domNode.attribs.href}
					</a>
				)
			}
		}
	}

	return (
		<div
			className={classNames(
				'grid grid-cols-[60px_auto] auto-rows-auto',
				className
			)}
		>
			<PointsButton vote={vote} points={data.points} onClick={toogleVote} />

			<div className='gap-x-1 flex col-span-2 row-start-1 row-end-1'>
				<RecordInfo
					type='comment'
					author={data.author}
					dateTimeStamp={data.created_at_i}
					onHideClick={() => {}}
					parentId={data.parent_id}
				/>
			</div>
			<div className='text-stone-400 col-span-2 row-start-2 row-end-2'>
				<h3 className='text-slate-600 font-medium'>
					{ReactHtmlParser(commentText, options)}
				</h3>
			</div>
		</div>
	)
}

export default Comment
