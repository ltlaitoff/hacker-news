import React, { FC } from 'react'
import { timeSince } from 'utils/timeSince'
import { TimeAgoProps } from './TimeAgo.interfaces'

const TimeAgo: FC<TimeAgoProps> = ({ dateTimeStamp, className, ...args }) => {
	return (
		<span className={className} {...args}>
			{timeSince(dateTimeStamp)}
		</span>
	)
}

export default TimeAgo
