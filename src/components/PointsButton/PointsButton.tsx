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
				'pink-hover row-start-1 row-end-3 col-span-1 self-start ',
				vote ? 'pink-link sky-hover font-medium' : 'text-stone-400 pink-hover ',
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
