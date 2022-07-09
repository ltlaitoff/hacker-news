import { FilterPosition } from '../Filter.interfaces'

const getPopupOffset = (element: HTMLElement): FilterPosition => {
	const boundingClientRect = element.getBoundingClientRect()

	return {
		left: boundingClientRect.left + window.scrollX || 0,
		top:
			boundingClientRect.top + boundingClientRect.height + window.scrollY || 0
	}
}

export { getPopupOffset }
