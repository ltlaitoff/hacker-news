import React, { FC } from 'react'
import { LoaderProps } from './Loader.interfaces'
import classNames from 'classnames'

const Loader: FC<LoaderProps> = ({ type, className, ...args }) => {
	type = type ?? 'sky'

	return (
		<div
			className={classNames(
				'flex items-center justify-center w-full h-full mt-10',
				className
			)}
			{...args}
		>
			<div
				className={classNames(
					'border-r-transparent animate-spin drop-shadow-sky-400-01 w-16 h-16 m-0 bg-transparent border-t-4 border-r-4 rounded-full',
					{
						'border-t-sky-400 drop-shadow-sky-400-01': type === 'sky',
						'border-t-pink-400 drop-shadow-pink-400-02': type === 'pink'
					}
				)}
			></div>
		</div>
	)
}
export default Loader
