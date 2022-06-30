import onKeyPressObserver from 'observers/onKeyPressObserver'
import { useEffect } from 'react'

const ESC_KEY = 'Escape'

const useEscKeyDown = (
	callback: (e: KeyboardEvent) => void,
	once?: boolean,
	ifVariable?: boolean
) => {
	useEffect(() => {
		const options = once ? { callStackOnce: once } : {}

		if (ifVariable !== undefined) {
			if (ifVariable) {
				onKeyPressObserver.subscribe(ESC_KEY, callback, options)
				return
			}

			onKeyPressObserver.unsubscribe(ESC_KEY, callback, options)
			return
		}

		onKeyPressObserver.subscribe(ESC_KEY, callback, options)

		return () => {
			onKeyPressObserver.unsubscribe(ESC_KEY, callback, options)
		}
	}, [callback, once, ifVariable])
}

export default useEscKeyDown
