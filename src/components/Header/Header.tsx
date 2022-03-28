import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { routerData } from 'routes'

const Header: FC = () => {
	const location = useLocation()

	return (
		<header className='flex pt-3 text-base font-medium'>
			<h1>
				<Link
					to='/'
					className='hover:text-pink-500 text-cyan-900 focus-visible:outline-2 focus-visible:outline-blue-500 hover:duration-200 inline-block p-5 text-lg font-semibold rounded-sm'
				>
					Hacker news
				</Link>
			</h1>

			<nav className='pl-10'>
				<ul className='flex items-center h-full'>
					{routerData.routes.map((route: routerData.Route) => {
						if (!route.inMenu) return null

						console.log(
							route.path,
							location.pathname,
							route.path === location.pathname
						)

						return (
							<li className='align-center h-full' key={route.id}>
								<Link
									to={route.path}
									className={classNames(
										'decoration-transparent hover:underline hover:decoration-pink-500 underline-offset-1 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-pink-500 focus-visible:text-cyan-800 focus:outline-none hover:duration-200 box-border flex items-center w-full h-full px-4  capitalize align-middle transition ease-in rounded-sm',
										{
											'text-pink-400 hover:text-sky-400 hover:drop-shadow-sky-400-01':
												route.path === location.pathname,
											'text-gray-700 hover:text-cyan-800':
												route.path !== location.pathname
										}
									)}
								>
									{route.routeName}
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		</header>
	)
}
export default Header
