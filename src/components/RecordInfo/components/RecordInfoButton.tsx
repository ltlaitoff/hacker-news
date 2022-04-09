import React, { FC } from 'react'
import classNames from 'classnames'
import { RecordInfoButtonProps } from './RecordInfoButton.interfaces'
import { Link } from 'react-router-dom'

const RecordInfoButton: FC<RecordInfoButtonProps> = ({
	text,
	onClick,
	to,
	href,
	className,
	children,
	...args
}) => {
	const classes = classNames(
		'hover:text-pink-400 hover:duration-200',
		className
	)

	const outputChildren = children ? children : text

	if (to) {
		return (
			<Link to={to} className={classes} {...args}>
				{outputChildren}
			</Link>
		)
	}

	if (href) {
		return (
			<a href={href} className={classes} {...args}>
				{outputChildren}
			</a>
		)
	}

	return (
		<button className={classes} onClick={onClick} {...args}>
			{outputChildren}
		</button>
	)
}

export default RecordInfoButton
