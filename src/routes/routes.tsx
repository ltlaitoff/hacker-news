import React from 'react'
import { Home, Past, Newcomments, Ask, Profile, Comments } from 'pages'
import { ReactElement } from 'react'

export interface Route {
	id: number
	routeName: string
	path: string
	element: ReactElement
	inMenu?: boolean
}

export const routes: Route[] = [
	{
		id: 0,
		routeName: 'home',
		path: '/',
		element: <Home />,
		inMenu: true
	},
	{
		id: 1,
		routeName: 'past',
		path: '/past',
		element: <Past />,

		inMenu: true
	},
	{
		id: 2,
		routeName: 'comments',
		path: '/newcomments',
		element: <Newcomments />,

		inMenu: true
	},
	{
		id: 3,
		routeName: 'ask',
		path: '/ask',
		element: <Ask />,

		inMenu: true
	},
	{
		id: 4,
		routeName: 'profile',
		element: <Profile />,
		path: '/profile'
	},
	{
		id: 4,
		routeName: 'Item comments',
		element: <Comments />,
		path: '/comments'
	}
]
