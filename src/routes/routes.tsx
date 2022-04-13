import React from 'react'

import { ReactElement } from 'react'

const Home = React.lazy(() => import('pages/Home.page'))
const New = React.lazy(() => import('pages/New.page'))
const Stories = React.lazy(() => import('pages/Stories.page'))
const Comments = React.lazy(() => import('pages/Comments.page'))
const Polls = React.lazy(() => import('pages/Polls.page'))
const Show = React.lazy(() => import('pages/Show.page'))
const Ask = React.lazy(() => import('pages/Ask.page'))
const Profile = React.lazy(() => import('pages/Profile.page'))
const RecordComments = React.lazy(() => import('pages/RecordComments.page'))

export interface Route {
	id: number
	routeName: string
	path: string
	element: ReactElement
	inMenu?: boolean
	index?: boolean
}

export const routes: Route[] = [
	{
		id: 0,
		routeName: 'home',
		path: '/',
		element: <Home />,
		index: true,
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
		routeName: 'recordcomments',
		path: '/recordcomments/:id',
		element: <RecordComments />
	}
]
