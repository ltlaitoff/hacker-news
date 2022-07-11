import { getPopupOffset } from './getPopupOffset'

describe('getPopupOffset Filter helper', () => {
	it.each`
		elementLeft  | elementTop   | elementHeight | scrollX      | scrollY      | resultLeft | resultTop
		${1}         | ${1}         | ${1}          | ${1}         | ${1}         | ${2}       | ${3}
		${100}       | ${150}       | ${100}        | ${50}        | ${250}       | ${150}     | ${500}
		${undefined} | ${undefined} | ${undefined}  | ${50}        | ${1}         | ${0}       | ${0}
		${undefined} | ${1}         | ${1}          | ${1}         | ${1}         | ${0}       | ${3}
		${1}         | ${undefined} | ${1}          | ${1}         | ${1}         | ${2}       | ${0}
		${1}         | ${1}         | ${undefined}  | ${1}         | ${1}         | ${2}       | ${0}
		${1}         | ${1}         | ${1}          | ${undefined} | ${1}         | ${0}       | ${3}
		${1}         | ${1}         | ${1}          | ${1}         | ${undefined} | ${2}       | ${0}
	`(
		'getPopupOffset element.getBoundingClientRect = {left = $elementLeft, top = $elementTop, height = $elementHeight} and window.scrollX = $scrollX, window.scrollY = $scrollY should return {left: $resultLeft, top: $resultTop}',
		({
			elementLeft,
			elementTop,
			elementHeight,
			scrollX,
			scrollY,
			resultLeft,
			resultTop
		}) => {
			window.scrollX = scrollX
			window.scrollY = scrollY

			const element = {
				getBoundingClientRect() {
					return {
						left: elementLeft,
						top: elementTop,
						height: elementHeight
					}
				}
			} as HTMLElement

			expect(getPopupOffset(element)).toStrictEqual({
				left: resultLeft,
				top: resultTop
			})
		}
	)
})
