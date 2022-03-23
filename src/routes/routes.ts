import { Newest, Past, Newcomments, Ask, Profile, Comments } from 'pages'
import { ReactElement } from 'react'

export interface Route {
	id: number
	name: string
	path: string
	element: ReactElement
	inMenu?: boolean
}

export const routes: Route[] = [
	{
		id: 0,
		name: 'new',
		path: '/',
		element: <Newest />,
		inMenu: true
	},
	{
		id: 1,
		name: 'past',
		path: '/past',
		element: <Past />,

		inMenu: true
	},
	{
		id: 2,
		name: 'comments',
		path: '/newcomments',
		element: <Newcomments />,

		inMenu: true
	},
	{
		id: 3,
		name: 'ask',
		path: '/ask',
		element: <Ask />,

		inMenu: true
	},
	{
		id: 4,
		name: 'profile',
		element: <Profile />,
		path: '/profile'
	},
	{
		id: 4,
		name: 'Item comments',
		element: <Comments />,
		path: '/comments'
	}
]
