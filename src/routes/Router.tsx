import React, { FC } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import Default from '../layouts/Default'

const Router: FC = ({ children }) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Default />}>
					{routes.map(route => {
						return (
							<Route
								path={route.index ? '' : route.path}
								element={route.element}
								key={route.id}
								index={route.index}
							/>
						)
					})}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
