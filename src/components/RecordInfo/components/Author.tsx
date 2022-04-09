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
			className={classNames(
				'hover:text-pink-400 hover:duration-200 text-sky-500 drop-shadow-sky-400-01 hover:drop-shadow-pink-400-02',
				className
			)}
			to={profileLink}
			{...args}
		>
			{author}
		</Link>
	)
}

export default Author
