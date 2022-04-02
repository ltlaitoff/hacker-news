import React from 'react'
import {
	Home,
	New,
	Stories,
	Comments,
	Polls,
	Show,
	Ask,
	Profile,
	PostComments
} from 'pages'
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
		routeName: 'new',
		path: '/new',
		element: <New />,
		inMenu: true
	},
	{
		id: 2,
		routeName: 'stories',
		path: '/stories',
		element: <Stories />,

		inMenu: true
	},
	{
		id: 3,
		routeName: 'comments',
		path: '/comments',
		element: <Comments />,

		inMenu: true
	},

	{
		id: 4,
		routeName: 'polls',
		path: '/polls',
		element: <Polls />,

		inMenu: true
	},
	{
		id: 5,
		routeName: 'show',
		path: '/show',
		element: <Show />,

		inMenu: true
	},
	{
		id: 6,
		routeName: 'ask',
		path: '/ask',
		element: <Ask />,

		inMenu: true
	},
	{
		id: 7,
		routeName: 'profile',
		path: '/profile',
		element: <Profile />
	},
	{
		id: 8,
		routeName: 'postcomments',
		path: '/postcomments',
		element: <PostComments />
	}
]
