import onKeyPressObserver from './onKeyPressObserver'

/*
	[x] After mount on "keydown" event _onKeyPress should be called
	[x] After mount, unmount on "keydown" event _onKeyPress should be NOT called
	
	[x] On subscribe on (key = $key, callback = Function), on "keydown" event with (key === $key) callback should be called
	[x] On subscribe on (firstKey = key = $key, firstCallback = Function) and subscribe on (secondKey = key = $key, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be called(secondKey === key) and firstCallback NOT be called
	[x] On subscribe on (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be NOT called(secondKey !== key) and firstCallback NOT be called

	[x] On subscribe on (key = $key, callback = Function), on "keydown" event callback should be called. After unsubscribe, on "keydown" event callback should NOT be called
	[x] On subscribe on (firstKey = key = $key, firstCallback = Function) and subscribe on (secondKey = key = $key, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be called(secondKey === key) and firstCallback NOT be called; After unsubscribe, on "keydown" event secondCallback should NOT be called and firstCallback be called
	[x] On subscribe on (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be NOT called(secondKey !== key) and firstCallback NOT be called; After unsubscribe, on "keydown" event secondCallback should NOT be called and firstCallback be called

	[x] On subscribe on (key = $key, callback = Function, options = {callEveryOnPress: true}), on "keydown" event callback should be called
	[x] On subscribe on (firstKey = key = $key, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = key = $key, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event secondCallback should be called and firstCallback be called
	[x] On subscribe on (firstKey = $firstKey, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = $secondKey, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event secondCallback should NOT be called(key !== secondKey) and firstCallback be called

	[x] On subscribe on (key = $key, callback = Function, options = {callEveryOnPress: true}) on "keydown" event callback should be called; After unsubscribe, on "keydown" event callback should NOT be called
	[x] On subscribe on (firstKey = key = $key, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = key = $key, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event secondCallback should be called and firstCallback be called. After unsubscribe first and second, on "keydown" event secondCallback should NOT be called and firstCallback should NOT be called
	[x] On subscribe on (firstKey = $firstKey, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = $secondKey, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event secondCallback should be called and firstCallback be called. After unsubscribe, on "keydown" event secondCallback should NOT be called and firstCallback should be called
	
	
	[ ] On subscribe with (key = $key, callback = Function), on "keydown" event callback should be called. After clear(), on "keydown" event callback should NOT be called
	[ ] On subscribe with (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function), on "keydown" event secondCallback should be called and firstCallback should NOT be   called. After clear() on "keydown" event firstCallback should NOT be called and secondCallback should NOT be called

	[ ] On subscribe with (key = $key, callback = Function), on "keydown" event callback should be called. After umount(), on "keydown" event callback should NOT be called
	[ ] On subscribe with (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function), on "keydown" event secondCallback should be called and firstCallback should NOT be   called. After umount() on "keydown" event firstCallback should NOT be called and secondCallback should NOT be called
*/

describe('onKeyPressObserver', () => {
	let keydown: Function = (value: { key: string }) => {}
	let observer = { ...onKeyPressObserver, stack: [], callEvery: new Set() }

	beforeEach(() => {
		keydown = jest.fn()
		observer = { ...onKeyPressObserver, stack: [], callEvery: new Set() }

		document.addEventListener = jest.fn((event, callback) => {
			keydown = callback as Function
		})

		document.removeEventListener = jest.fn((event, callback) => {
			keydown = jest.fn()
		})
	})

	it('After mount, on "keydown" event _onKeyPress should be called', () => {
		observer._onKeyPress = jest.fn()

		observer.mount()
		keydown({ key: 'Esc' })

		expect(observer._onKeyPress).toBeCalledWith({ key: 'Esc' })
	})

	it('After mount, unmount on "keydown" event _onKeyPress should NOT be called', () => {
		observer._onKeyPress = jest.fn()

		observer.mount()
		observer.unmount()

		keydown({ key: 'Esc' })

		expect(observer._onKeyPress).not.toBeCalled()
	})

	describe('Standart without options', () => {
		it.each`
			key
			${'Esc'}
			${'Enter'}
			${'A'}
		`(
			'On subscribe on (key = $key, callback = Function), on "keydown" event with (key === $key) callback should be called',
			({ key }) => {
				const callback = jest.fn()

				observer.mount()
				observer.subscribe(key, callback)

				keydown({ key: key })

				expect(callback).toBeCalled()
			}
		)

		it.each`
			key
			${'Esc'}
			${'Enter'}
			${'A'}
		`(
			'On subscribe on (key = $key, callback = Function), on "keydown" event with (key !== $key) callback should be called',
			({ key }) => {
				const callback = jest.fn()

				observer.mount()
				observer.subscribe(key, callback)

				keydown({ key: 'random' })

				expect(callback).not.toBeCalled()
			}
		)

		it.each`
			key
			${'Esc'}
			${'Enter'}
			${'A'}
		`(
			'On subscribe on (firstKey = key = $key, firstCallback = Function) and subscribe on (secondKey = key = $key, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be called(secondKey === key) and firstCallback NOT be called',
			({ key }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(key, firstCallback)
				observer.subscribe(key, secondCallback)

				keydown({ key: key })

				expect(secondCallback).toBeCalled()
				expect(firstCallback).not.toBeCalled()
			}
		)

		it.each`
			firstKey   | secondKey
			${'Esc'}   | ${'B'}
			${'Enter'} | ${'T'}
			${'A'}     | ${'C'}
		`(
			'On subscribe on (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be NOT called(secondKey !== key) and firstCallback NOT be called',
			({ firstKey, secondKey }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(firstKey, firstCallback)
				observer.subscribe(secondKey, secondCallback)

				keydown({ key: firstKey })

				expect(secondCallback).not.toBeCalled()
				expect(firstCallback).not.toBeCalled()
			}
		)
	})

	describe('Standart without options with unsubscribe', () => {
		it.each`
			key
			${'Esc'}
			${'Enter'}
			${'A'}
		`(
			'On subscribe on (key = $key, callback = Function), on "keydown" event callback should be called. After unsubscribe, on "keydown" event callback should NOT be called',
			({ key }) => {
				const callback = jest.fn()

				observer.mount()

				observer.subscribe(key, callback)
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)

				observer.unsubscribe(key, callback)
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)
			}
		)

		it.each`
			key
			${'Esc'}
			${'Enter'}
			${'A'}
		`(
			'On subscribe on (firstKey = key = $key, firstCallback = Function) and subscribe on (secondKey = key = $key, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be called(secondKey === key) and firstCallback NOT be called; After unsubscribe, on "keydown" event secondCallback should NOT be called and firstCallback be called',
			({ key }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(key, firstCallback)
				observer.subscribe(key, secondCallback)

				keydown({ key: key })

				expect(secondCallback).toBeCalledTimes(1)
				expect(firstCallback).not.toBeCalled()

				observer.unsubscribe(key, secondCallback)
				keydown({ key: key })

				expect(firstCallback).toBeCalled()
				expect(secondCallback).toBeCalledTimes(1)
			}
		)

		it.each`
			firstKey   | secondKey
			${'A'}     | ${'C'}
			${'Esc'}   | ${'B'}
			${'Enter'} | ${'T'}
		`(
			'On subscribe on (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function), on "keydown" event with (key = $firstKey) secondCallback should be NOT called(secondKey !== key) and firstCallback NOT be called; After unsubscribe, on "keydown" event secondCallback should NOT be called and firstCallback be called',
			({ firstKey, secondKey }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(firstKey, firstCallback)
				observer.subscribe(secondKey, secondCallback)

				keydown({ key: firstKey })

				expect(secondCallback).not.toBeCalled()
				expect(firstCallback).not.toBeCalled()

				observer.unsubscribe(secondKey, secondCallback)
				keydown({ key: firstKey })

				expect(secondCallback).not.toBeCalled()
				expect(firstCallback).toBeCalled()
			}
		)
	})

	describe('With callEveryOnPress: true option', () => {
		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (key = $key, callback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $key) callback should be called',
			({ key }) => {
				const callback = jest.fn()
				observer.mount()

				observer.subscribe(key, callback, { callEveryOnPress: true })
				keydown({ key: key })

				expect(callback).toBeCalled()
			}
		)

		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (firstKey = key = $key, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = key = $key, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $key) secondCallback should be called and firstCallback be called',
			({ key }) => {
				const callback = jest.fn()

				observer.mount()
				observer.subscribe(key, callback, { callEveryOnPress: true })

				keydown({ key: key })

				expect(callback).toBeCalled()
			}
		)

		it.each`
			firstKey   | secondKey
			${'A'}     | ${'C'}
			${'Esc'}   | ${'B'}
			${'Enter'} | ${'T'}
		`(
			'On subscribe on (firstKey = $firstKey, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = $secondKey, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $firstKey) secondCallback should NOT be called(key !== secondKey) and firstCallback be called',
			({ firstKey, secondKey }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()
				observer.mount()

				observer.subscribe(firstKey, firstCallback, { callEveryOnPress: true })
				observer.subscribe(secondKey, secondCallback, {
					callEveryOnPress: true
				})

				keydown({ key: firstKey })

				expect(secondCallback).not.toBeCalled()
				expect(firstCallback).toBeCalled()
			}
		)
	})

	describe('With callEveryOnPress: true option and with unsubscribe', () => {
		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (key = $key, callback = Function, options = {callEveryOnPress: true}) on "keydown" event callback should be called; After unsubscribe, on "keydown" event callback should NOT be called',
			({ key }) => {
				const callback = jest.fn()
				observer.mount()

				observer.subscribe(key, callback, { callEveryOnPress: true })
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)

				observer.unsubscribe(key, callback, { callEveryOnPress: true })
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)
			}
		)

		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (firstKey = key = $key, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = key = $key, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $key) secondCallback should be called and firstCallback should be called; After unsubscribe on secondCallback, on "keydown" event with (key = $key) secondCallback callback should NOT be called and firstCallback should be called',
			({ key }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(key, firstCallback, { callEveryOnPress: true })
				observer.subscribe(key, secondCallback, {
					callEveryOnPress: true
				})

				keydown({ key: key })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).toBeCalledTimes(1)

				observer.unsubscribe(key, secondCallback, { callEveryOnPress: true })
				keydown({ key: key })

				expect(firstCallback).toBeCalledTimes(2)
				expect(secondCallback).toBeCalledTimes(1)
			}
		)

		it.each`
			firstKey   | secondKey
			${'A'}     | ${'C'}
			${'Esc'}   | ${'B'}
			${'Enter'} | ${'T'}
		`(
			'On subscribe on (firstKey = $firstKey, firstCallback = Function, options = {callEveryOnPress: true}) and subscribe on (secondKey = $secondKey, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event secondCallback should NOT be called(key !== secondKey) and firstCallback be called; After unsubscribe on secondCallback, on "keydown" event with (key = $key) secondCallback callback should NOT be called and firstCallback should be called',
			({ firstKey, secondKey }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(firstKey, firstCallback, { callEveryOnPress: true })
				observer.subscribe(secondKey, secondCallback, {
					callEveryOnPress: true
				})

				keydown({ key: firstKey })

				expect(secondCallback).not.toBeCalled()
				expect(firstCallback).toBeCalledTimes(1)

				observer.unsubscribe(firstKey, secondCallback, {
					callEveryOnPress: true
				})
				keydown({ key: firstKey })

				expect(secondCallback).not.toBeCalled()
				expect(firstCallback).toBeCalledTimes(2)
			}
		)
	})

	describe('Check clear', () => {
		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (key = $key, callback = Function), on "keydown" event(key = $key) callback should be called. After clear(), on "keydown" event callback should NOT be called',
			({ key }) => {
				const callback = jest.fn()
				observer.mount()

				observer.subscribe(key, callback, { callEveryOnPress: true })
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)

				observer.clear()
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)
			}
		)

		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (firstKey = key = $key, firstCallback = Function) and subscribe on (secondKey = key = $key, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $key) secondCallback should be called and firstCallback should be called; After clear() on "keydown" event(key = $key) firstCallback should NOT be called and secondCallback should NOT be called',
			({ key }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(key, firstCallback)
				observer.subscribe(key, secondCallback, {
					callEveryOnPress: true
				})

				keydown({ key: key })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).toBeCalledTimes(1)

				observer.clear()
				keydown({ key: key })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).toBeCalledTimes(1)
			}
		)

		it.each`
			firstKey   | secondKey
			${'A'}     | ${'C'}
			${'Esc'}   | ${'B'}
			${'Enter'} | ${'T'}
		`(
			'On subscribe on (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $firstKey) secondCallback should NOT be called and firstCallback should be called; After clear() on "keydown" event(key = $firstKey) firstCallback should NOT be called and secondCallback should NOT be called',
			({ firstKey, secondKey }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(firstKey, firstCallback)
				observer.subscribe(secondKey, secondCallback, {
					callEveryOnPress: true
				})

				keydown({ key: firstKey })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).not.toBeCalled()

				observer.clear()
				keydown({ key: firstKey })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).not.toBeCalled()
			}
		)
	})

	describe('Check umount', () => {
		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (key = $key, callback = Function), on "keydown" event(key = $key) callback should be called. After unmount(), on "keydown" event callback should NOT be called',
			({ key }) => {
				const callback = jest.fn()
				observer.mount()

				observer.subscribe(key, callback, { callEveryOnPress: true })
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)

				observer.unmount()
				keydown({ key: key })

				expect(callback).toBeCalledTimes(1)
			}
		)

		it.each`
			key
			${'A'}
			${'Esc'}
			${'Enter'}
		`(
			'On subscribe on (firstKey = key = $key, firstCallback = Function) and subscribe on (secondKey = key = $key, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $key) secondCallback should be called and firstCallback should be called; After unmount() on "keydown" event(key = $key) firstCallback should NOT be called and secondCallback should NOT be called',
			({ key }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(key, firstCallback)
				observer.subscribe(key, secondCallback, {
					callEveryOnPress: true
				})

				keydown({ key: key })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).toBeCalledTimes(1)

				observer.unmount()
				keydown({ key: key })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).toBeCalledTimes(1)
			}
		)

		it.each`
			firstKey   | secondKey
			${'A'}     | ${'C'}
			${'Esc'}   | ${'B'}
			${'Enter'} | ${'T'}
		`(
			'On subscribe on (firstKey = $firstKey, firstCallback = Function) and subscribe on (secondKey = $secondKey, secondCallback = Function, options = {callEveryOnPress: true}), on "keydown" event with (key = $firstKey) secondCallback should NOT be called and firstCallback should be called; After unmount() on "keydown" event(key = $firstKey) firstCallback should NOT be called and secondCallback should NOT be called',
			({ firstKey, secondKey }) => {
				const firstCallback = jest.fn()
				const secondCallback = jest.fn()

				observer.mount()
				observer.subscribe(firstKey, firstCallback)
				observer.subscribe(secondKey, secondCallback, {
					callEveryOnPress: true
				})

				keydown({ key: firstKey })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).not.toBeCalled()

				observer.unmount()
				keydown({ key: firstKey })

				expect(firstCallback).toBeCalledTimes(1)
				expect(secondCallback).not.toBeCalled()
			}
		)
	})
})
