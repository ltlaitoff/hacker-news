import { useEffect } from 'react'

const useKeyDown = (callback: (e: KeyboardEvent) => void) => {
	useEffect(() => {
		document.addEventListener('keydown', callback)

		return () => {
			document.removeEventListener('keydown', callback)
		}
	})
}

export default useKeyDown
