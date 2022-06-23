export type Key = KeyboardEvent['key']
export type Callback = () => void

export type Item = {
	key: Key
	callback: Callback
}

export type Options = {
	callEveryOnPress?: boolean
}

export interface OnKeyPressObserver {
	stack: Array<Item>
	callEvery: Set<Item>
	subscribe: (key: Key, callback: Callback, options?: Options) => boolean
	unsubscribe: (key: Key, callback: Callback, options?: Options) => void
	_onKeyPress: (e: KeyboardEvent) => void
	mount: () => void
	unmount: () => void
	clear: () => void
}
