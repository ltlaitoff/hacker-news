import React, { FC } from 'react'

import classNames from 'classnames'
import { PointsButtonProps } from './PointsButton.interfaces'

const PointsButton: FC<PointsButtonProps> = ({
	vote,
	onClick,
	points,
	className,
	...args
}: PointsButtonProps) => {
	return (
		<button
			className={classNames(
				'row-start-1 row-end-3 hover:text-pink-400 hover:duration-200 col-span-1 drop-shadow-md self-start ',
				vote
					? 'text-pink-400 hover:drop-shadow-sky-400 hover:text-sky-400 font-medium'
					: 'text-stone-400 hover:drop-shadow-pink-400 ',
				className
			)}
			onClick={onClick}
			{...args}
		>
			<div>▲</div>
			<div>{points}</div>
		</button>
	)
}

export default PointsButton
