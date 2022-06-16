import { useEffect, useRef } from 'react'
import { checkElementInArray } from 'helpers'

const useOutsideClick = (callback: () => void) => {
	const ref = useRef<HTMLDivElement>(null)

	const checkClickOutside = (e: MouseEvent): void => {
		if (ref.current && !checkElementInArray(e.composedPath(), ref.current)) {
			callback()
		}
	}

	useEffect(() => {
		document.addEventListener('click', checkClickOutside)

		return () => {
			document.removeEventListener('click', checkClickOutside)
		}
	})

	return ref
}

export default useOutsideClick
