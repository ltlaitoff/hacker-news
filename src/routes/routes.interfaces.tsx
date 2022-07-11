import { ReactElement } from 'react'

export type PageNames =
	| 'home'
	| 'new'
	| 'stories'
	| 'comments'
	| 'polls'
	| 'show'
	| 'ask'

interface RouteBase {
	id: number
	routeName: string
	path: string
	element: ReactElement
	inMenu?: boolean
	index?: boolean
}

interface RouteInMenu extends RouteBase {
	routeName: PageNames
	inMenu: boolean
}

interface RouteStandart extends RouteBase {
	routeName: string
}

export type Route = RouteInMenu | RouteStandart
