import { checkElementIsItem } from './helpers'
import {
	Callback,
	EveryItem,
	Key,
	OnKeyPressObserverType,
	Options,
	StackItem,
	Store
} from './onKeyPressObserver.interfaces'

/* 
	TODO: callEveryOnce option 
*/

class OnKeyPressObserver implements OnKeyPressObserverType {
	private store: Store = {
		stack: {},
		every: {}
	}

	public constructor() {
		this.store.stack = {}
		this.store.every = {}
	}

	public mount() {
		document.addEventListener('keydown', this.onKeyPress.bind(this))
	}

	public unmount() {
		document.removeEventListener('keydown', this.onKeyPress.bind(this))
		this.clear()
	}

	public clear() {
		this.store.stack = {}
		this.store.every = {}
	}

	public subscribe(key: Key, callback: Callback, options?: Options) {
		if (options) {
			if (options.callEveryOnPress) {
				this.addNewEveryElement(key, callback, options)

				return
			}
		}

		this.addNewStackElement(key, callback, options)
	}

	public unsubscribe(key: Key, callback: Callback, options?: Options) {
		if (options) {
			if (options.callEveryOnPress) {
				const currentSet = this.store.every[key]

				currentSet.forEach(element => {
					if (checkElementIsItem(element, callback, options)) {
						currentSet.delete(element)
					}
				})

				return
			}
		}

		this.removeStackElement(key, callback, options)
	}

	/* OnKeyPress and callbacks calling */
	private callEveryCallbacksByKey(e: KeyboardEvent, key: Key) {
		const everySet = this.store.every[key]
		if (!everySet) return

		const everyForCalling = Array.from(everySet)

		everyForCalling.forEach(item => {
			item.callback(e)
		})
	}

	private callStackCallbacksByKey(e: KeyboardEvent, key: Key) {
		const stackForCalling = this.getStackLastItemByKey(this.store.stack, key)

		stackForCalling.forEach(item => {
			item.callback(e)

			if (item.options) {
				if (item.options.callStackOnce) {
					this.removeStackElement(key, item.callback, item.options)
				}
			}
		})
	}

	private onKeyPress(e: KeyboardEvent) {
		const currentKey = e.key

		this.callStackCallbacksByKey(e, currentKey)
		this.callEveryCallbacksByKey(e, currentKey)
	}

	/* Stack and Every */
	private checkKeyWithTypeIsDefined(
		type: 'stack' | 'every',
		key: Key
	): boolean {
		switch (type) {
			case 'stack': {
				return this.store.stack[key] !== undefined
			}
			case 'every': {
				return this.store.every[key] !== undefined
			}
		}

		return false
	}

	private checkAndCreateNewElementOnKeyWithType(
		type: 'stack' | 'every',
		key: Key
	) {
		switch (type) {
			case 'every': {
				if (!this.checkKeyWithTypeIsDefined(type, key)) {
					this.store.every[key] = new Set()
				}

				return
			}

			case 'stack': {
				if (!this.checkKeyWithTypeIsDefined(type, key)) {
					this.store.stack[key] = []
				}

				return
			}
		}
	}

	/* Stack */
	private getStackLastItemByKey(
		object: Record<Key, Array<StackItem>>,
		key: Key
	): Array<StackItem> {
		const values = object[key]

		if (!values || values.length === 0) {
			return []
		}

		const atValue = values.at(-1)

		if (!atValue) return []

		return [atValue]
	}

	private addNewStackElement(key: Key, callback: Callback, options?: Options) {
		this.checkAndCreateNewElementOnKeyWithType('stack', key)

		const currentStackOnKey = this.store.stack[key]

		const indexOfElementInStackOnKey = currentStackOnKey.findIndex(element =>
			checkElementIsItem(element, callback, options)
		)

		if (indexOfElementInStackOnKey !== -1) {
			if (options) {
				if (options.toTheStackTop) {
					delete currentStackOnKey[indexOfElementInStackOnKey]
					currentStackOnKey.push({
						callback,
						options
					})
				}
			}

			return
		}

		if (options) {
			currentStackOnKey.push({ callback, options })

			return
		}

		currentStackOnKey.push({ callback })
	}

	private removeStackElement(key: Key, callback: Callback, options?: Options) {
		if (!this.checkKeyWithTypeIsDefined('stack', key)) {
			return
		}

		const currentElementStack = this.store.stack[key]

		const indexOfCurrentElementInStack = this.indexOfItemInArray(
			currentElementStack,
			callback,
			options
		)

		if (indexOfCurrentElementInStack !== -1) {
			currentElementStack.splice(indexOfCurrentElementInStack, 1)

			return
		}
	}

	/* Every */
	private addNewEveryElement(key: Key, callback: Callback, options: Options) {
		this.checkAndCreateNewElementOnKeyWithType('every', key)

		const currentEventOnKey = this.store.every[key]
		const newElementValue = {
			callback,
			options
		}

		const indexOfElementInEventOnKey = this.indexOfItemInArray(
			Array.from(currentEventOnKey),
			callback,
			options
		)

		if (indexOfElementInEventOnKey !== -1) {
			if (options) {
				if (options.toTheStackTop) {
					const currentSet = this.store.every[key]

					currentSet.forEach(element => {
						if (checkElementIsItem(element, callback, options)) {
							currentSet.delete(element)
						}
					})

					currentSet.add(newElementValue)
				}
			}

			return
		}

		currentEventOnKey.add(newElementValue)
	}

	private indexOfItemInArray(
		array: Array<EveryItem | StackItem>,
		callback: Callback,
		options?: Options
	): number {
		return array.findIndex(element =>
			checkElementIsItem(element, callback, options)
		)
	}
}

export default new OnKeyPressObserver()
