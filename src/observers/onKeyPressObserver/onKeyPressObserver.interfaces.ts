export type Key = KeyboardEvent['key']
export type Callback = (e: KeyboardEvent) => void

export interface Item {
	callback: Callback
}

export interface StackItem extends Item {
	options?: Options
}
export interface EveryItem extends Item {}

export type Options = {
	callEveryOnPress?: boolean
	callStackOnce?: boolean
	toTheStackTop?: boolean
}

export type Store = {
	stack: Record<Key, Array<StackItem>>
	every: Record<Key, Set<EveryItem>>
}
export interface OnKeyPressObserverType {
	mount: () => void
	unmount: () => void
	clear: () => void
	subscribe: (key: Key, callback: Callback, options?: Options) => void
	unsubscribe: (key: Key, callback: Callback, options?: Options) => void
}
