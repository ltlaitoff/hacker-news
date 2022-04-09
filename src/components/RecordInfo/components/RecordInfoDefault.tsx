import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { RecordInfoDefaultProps } from './RecordInfoDefault.interfaces'
import RecordInfoButton from './RecordInfoButton'

const getText = (commentsCount: number | null) => {
	if (!commentsCount) return 'discuss'

	const numericalForm = commentsCount > 1 ? 'comments' : 'comment'

	return `${commentsCount} ${numericalForm}`
}

const RecordInfoDefault: FC<RecordInfoDefaultProps> = ({
	id,
	commentsCount,
	noComments,
	className,
	...args
}) => {
	if (noComments) return null

	// TODO: Change it to import from routes
	let to: string = `/recordcomments/${id}`

	let text: string = getText(commentsCount)

	return (
		<>
			{' | '}
			<RecordInfoButton className={className} to={to} {...args}>
				{text}
			</RecordInfoButton>
		</>
	)
}

export default RecordInfoDefault
