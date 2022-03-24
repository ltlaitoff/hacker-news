import React, { FC } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'

const Router: FC = ({ children }) => {
	return (
		<BrowserRouter>
			{children}
			<Routes>
				{routes.map(route => {
					return (
						<Route path={route.path} element={route.element} key={route.id} />
					)
				})}
			</Routes>
		</BrowserRouter>
	)
}

export default Router
