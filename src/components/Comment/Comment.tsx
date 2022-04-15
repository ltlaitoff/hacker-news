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

const Comment: FC<CommentProps> = ({
	comment_text,
	showPoints,
	points,
	objectID,
	author,
	created_at_i,
	parent_id,
	story_id,
	level,
	className,
	...args
}: CommentProps) => {
	const [vote, setVote] = useState<boolean>(false)

	const toogleVote = () => setVote(currentVote => !currentVote)

	if (comment_text === null) return null

	const commentText = comment_text.split('\\n').join('<br />')

	const options: HTMLReactParserOptions = {
		replace: (domNode: DOMNode) => {
			if (domNode instanceof Element && domNode.name === 'a') {
				return (
					<a
						className='pink-hover sky-link font-normal'
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
			id={objectID}
			{...args}
		>
			{(showPoints === undefined || showPoints !== false) && (
				<PointsButton vote={vote} points={points} onClick={toogleVote} />
			)}

			<div className='gap-x-1 flex col-span-2 row-start-1 row-end-1'>
				<RecordInfo
					storyId={story_id}
					commentLevel={level}
					id={Number(objectID)}
					type='comment'
					author={author}
					dateTimeStamp={created_at_i}
					onHideClick={() => {}}
					parentId={parent_id}
				/>
			</div>
			<div className='text-slate-600 col-span-2 row-start-2 row-end-2 font-medium'>
				{ReactHtmlParser(commentText, options)}
			</div>
		</div>
	)
}

export default Comment
