import React from 'react'
import {
	Home,
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
		routeName: 'stories',
		path: '/stories',
		element: <Stories />,

		inMenu: true
	},
	{
		id: 2,
		routeName: 'comments',
		path: '/comments',
		element: <Comments />,

		inMenu: true
	},

	{
		id: 3,
		routeName: 'polls',
		path: '/polls',
		element: <Polls />,

		inMenu: true
	},
	{
		id: 4,
		routeName: 'show',
		path: '/show',
		element: <Show />,

		inMenu: true
	},
	{
		id: 5,
		routeName: 'ask',
		path: '/ask',
		element: <Ask />,

		inMenu: true
	},
	{
		id: 6,
		routeName: 'profile',
		path: '/profile',
		element: <Profile />
	},
	{
		id: 7,
		routeName: 'postcomments',
		path: '/postcomments',
		element: <PostComments />
	}
]
