import { Pathname } from 'react-router-dom'
import { PageNames } from 'routes/routes.interfaces'
import { routes } from '../routes'

export const getRouteNameByPath = (
	routePath: Pathname
): PageNames | undefined => {
	return routes.find(element => element.path === routePath)
		?.routeName as PageNames
}
