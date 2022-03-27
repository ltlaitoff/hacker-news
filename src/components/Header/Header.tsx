import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { routerData } from 'routes'

const Header: FC = () => {
	const location = useLocation()
	console.log(location)

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

						const activeClass =
							route.path === location.pathname
								? ' text-pink-400 hover:text-indigo-500 '
								: ''

						return (
							<li className='align-center h-full' key={route.id}>
								<Link
									to={route.path}
									className={
										'decoration-transparent hover:underline hover:decoration-pink-500 underline-offset-1 hover:text-cyan-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-pink-500 focus-visible:text-cyan-800 focus:outline-none hover:duration-200 box-border flex items-center w-full h-full px-4 text-gray-700 capitalize align-middle transition ease-in rounded-sm' +
										activeClass
									}
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
