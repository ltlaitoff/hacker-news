import { Callback, Options, StackItem } from '../onKeyPressObserver.interfaces'

const checkOptionsIsEquals = (
	elementOptions?: Options,
	options?: Options
): boolean => {
	if (!elementOptions && !options) return true

	return JSON.stringify(elementOptions) === JSON.stringify(options)
}

export const checkElementIsItem = (
	element: StackItem,
	callback: Callback,
	options?: Options
) => {
	const callbacksIsEqual = element.callback === callback
	const optionsIsEqual = checkOptionsIsEquals(element.options, options)

	return callbacksIsEqual && optionsIsEqual
}
