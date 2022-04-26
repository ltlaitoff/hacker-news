import React, { FC } from 'react'
import { NavLink, Link } from 'react-router-dom'
import classNames from 'classnames'

import { routerData } from 'routes'

const Header: FC = () => {
	return (
		<header className='flex pt-3 text-base font-medium'>
			<h1>
				<Link
					to='/'
					className='logo-text blue-focus-visible hover:duration-200 inline-block p-5 rounded-sm'
				>
					Hacker news
				</Link>
			</h1>

			<nav className='pl-16'>
				<ul className='flex items-center h-full'>
					{routerData.routes.map((route: routerData.Route) => {
						if (!route.inMenu) return null
						return (
							<li className='align-center h-full' key={route.id}>
								<NavLink
									to={route.path}
									className={({ isActive }) =>
										classNames(
											'pink-focus-visible decoration-transparent hover:underline hover:decoration-pink-500 underline-offset-1 hover:duration-200 box-border flex items-center w-full h-full px-4 capitalize align-middle transition ease-in rounded-sm',
											isActive ? 'active-menu-link' : 'disactive-menu-link'
										)
									}
								>
									{route.routeName}
								</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>
		</header>
	)
}
export default Header
