import React, { FC } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './routes'

const Router: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					return <Route path={route.path} element={route.element} />
				})}
			</Routes>
		</BrowserRouter>
	)
}

export default Router
