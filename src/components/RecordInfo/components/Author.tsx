import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { AuthorProps } from './Author.interfaces'

const Author: FC<AuthorProps> = ({
	profileLink,
	author,
	className,
	...args
}) => {
	return (
		<Link
			className={classNames('pink-hover sky-link', className)}
			to={profileLink}
			{...args}
		>
			{author}
		</Link>
	)
}

export default Author
