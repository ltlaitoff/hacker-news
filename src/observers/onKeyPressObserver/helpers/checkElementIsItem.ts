import { Callback, Item, Key } from '../onKeyPressObserver.interfaces'

export const checkElementIsItem = (
	element: Item,
	key: Key,
	callback: Callback
) => {
	const keysIsEqual = element.key === key
	const callbacksIsEqual = element.callback === callback

	return keysIsEqual && callbacksIsEqual
}
