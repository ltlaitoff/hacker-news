import { checkElementIsItem } from './helpers'
import { OnKeyPressObserver } from './onKeyPressObserver.interfaces'

const onKeyPressObserver: OnKeyPressObserver = {
	stack: [],
	callEvery: new Set(),

	subscribe(key, callback, options = {}) {
		const value = { key, callback }

		if (options.callEveryOnPress === true) {
			this.callEvery.add(value)
			return true
		}

		if (
			this.stack.find(element => checkElementIsItem(element, key, callback))
		) {
			return false
		}

		this.stack.push(value)
		return true
	},

	unsubscribe(key, callback, options = {}) {
		if (options.callEveryOnPress === true) {
			this.callEvery.forEach(element => {
				if (checkElementIsItem(element, key, callback)) {
					this.callEvery.delete(element)
				}
			})
		}

		this.stack = this.stack.filter(
			element => !checkElementIsItem(element, key, callback)
		)
	},

	_onKeyPress(e: KeyboardEvent) {
		const forCallingArray = Array.from(this.callEvery)

		const lastStackElement = this.stack.at(-1)

		if (lastStackElement) {
			forCallingArray.push(lastStackElement)
		}

		forCallingArray.forEach(item => {
			if (e.key === item.key) {
				item.callback()
			}
		})
	},

	mount() {
		document.addEventListener('keydown', this._onKeyPress.bind(this))
	},

	unmount() {
		document.removeEventListener('keydown', this._onKeyPress.bind(this))
		this.clear()
	},

	clear() {
		this.stack = []
		this.callEvery = new Set()
	}
}

export default onKeyPressObserver
