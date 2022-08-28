export const createInterval = (
	callback: () => void,
	delayBefore: number,
	delayInterval: number
) => {
	let fn: () => void
	let id: number
	const cancel = () => clearTimeout(id)

	id = window.setTimeout(
		(fn = () => {
			id = window.setTimeout(fn, delayInterval)
			callback()
		}),
		delayBefore
	)

	return cancel
}
