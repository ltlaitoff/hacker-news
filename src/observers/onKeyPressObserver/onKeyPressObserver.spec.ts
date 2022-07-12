import onKeyPressObserver from './onKeyPressObserver'
import 'core-js/features/array/at'

describe('onKeyPressObserver', () => {
	let keydown: Function = (value: { key: string }) => {}

	beforeEach(() => {
		keydown = jest.fn()

		document.addEventListener = jest.fn((event, callback) => {
			keydown = callback as Function
		})

		document.removeEventListener = jest.fn((event, callback) => {
			keydown = jest.fn()
		})
	})

	describe('Stack', () => {
		describe('Default', () => {
			describe('Subscribe', () => {
				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (key = $key, callback), on "keydown" event with (key === $key) callback should be called',
					({ key }) => {
						const callback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, callback)

						keydown({ key: key })

						expect(callback).toBeCalled()
					}
				)

				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (firstKey = $key, firstCallback), (secondKey = $key, secondCallback), on "keydown" event with (key === $key) secondCallback should be called and firstCallback should NOT be called',
					({ key }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, firstCallback)
						onKeyPressObserver.subscribe(key, secondCallback)

						keydown({ key: key })

						expect(firstCallback).not.toBeCalled()
						expect(secondCallback).toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback), (secondKey = $secondKey, secondCallback), on "keydown" event with (key === $firstKey) firstCallback should be called and secondCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback)
						onKeyPressObserver.subscribe(secondKey, secondCallback)

						keydown({ key: firstKey })

						expect(firstCallback).toBeCalled()
						expect(secondCallback).not.toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback), (secondKey = $secondKey, secondCallback), on "keydown" event with (key === $secondKey) secondCallback should be called and firstCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback)
						onKeyPressObserver.subscribe(secondKey, secondCallback)

						keydown({ key: secondKey })

						expect(firstCallback).not.toBeCalled()
						expect(secondCallback).toBeCalled()
					}
				)
			})

			describe('Unsubscribe', () => {
				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (key = $key, callback) and unsubscribe from (key = $key), on "keydown" event with (key === $key) callback should NOT be called',
					({ key }) => {
						const callback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, callback)
						onKeyPressObserver.unsubscribe(key, callback)

						keydown({ key: key })

						expect(callback).not.toBeCalled()
					}
				)

				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (firstKey = $key, firstCallback), (secondKey = $key, secondCallback) and unsubscribe from (secondKey = $key), on "keydown" event with (key === $key) secondCallback should NOT be called and firstCallback should be called',
					({ key }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, firstCallback)
						onKeyPressObserver.subscribe(key, secondCallback)
						onKeyPressObserver.unsubscribe(key, secondCallback)

						keydown({ key: key })

						expect(firstCallback).toBeCalled()
						expect(secondCallback).not.toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback), (secondKey = $secondKey, secondCallback) and unsubscribe from (firstKey = $firstKey), on "keydown" event with (key === $firstKey) firstCallback should NOT be called and secondCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback)
						onKeyPressObserver.subscribe(secondKey, secondCallback)
						onKeyPressObserver.unsubscribe(firstKey, firstCallback)

						keydown({ key: firstKey })

						expect(firstCallback).not.toBeCalled()
						expect(secondCallback).not.toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback), (secondKey = $secondKey, secondCallback) and unsubscribe from (secondKey = $secondKey), on "keydown" event with (key === $firstKey) firstCallback should be called and secondCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback)
						onKeyPressObserver.subscribe(secondKey, secondCallback)
						onKeyPressObserver.unsubscribe(secondKey, secondCallback)

						keydown({ key: firstKey })

						expect(firstCallback).toBeCalled()
						expect(secondCallback).not.toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback), (secondKey = $secondKey, secondCallback) and unsubscribe from (firstKey = $firstKey), on "keydown" event with (key === $secondKey) secondCallback should be called and firstCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback)
						onKeyPressObserver.subscribe(secondKey, secondCallback)
						onKeyPressObserver.unsubscribe(firstKey, firstCallback)

						keydown({ key: secondKey })

						expect(firstCallback).not.toBeCalled()
						expect(secondCallback).toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback), (secondKey = $secondKey, secondCallback) and unsubscribe from (secondKey = $secondKey), on "keydown" event with (key === $secondKey) secondCallback should NOT be called and firstCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback)
						onKeyPressObserver.subscribe(secondKey, secondCallback)
						onKeyPressObserver.unsubscribe(secondKey, secondCallback)

						keydown({ key: secondKey })

						expect(firstCallback).not.toBeCalled()
						expect(secondCallback).not.toBeCalled()
					}
				)
			})

			describe('Resubscribe', () => {
				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (firstKey = $key, firstCallback), (secondKey = $key, secondCallback) and resubscribe on (firstKey = $key, firstCallback), on "keydown" event with (key === $key) secondCallback should be called and firstCallback should NOT be called',
					({ key }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, firstCallback)
						onKeyPressObserver.subscribe(key, secondCallback)
						onKeyPressObserver.subscribe(key, firstCallback)

						keydown({ key: key })

						expect(firstCallback).not.toBeCalled()
						expect(secondCallback).toBeCalled()
					}
				)
			})
		})

		describe('callStackOnce option', () => {
			it.each`
				key
				${'A'}
				${'B'}
				${'Escape'}
				${'Enter'}
			`(
				'On subscribe on (key = $key, callback, {callStackOnce: true}). After SECOND "keydown" event with (key === $key) callback should be called once',
				({ key }) => {
					const callback = jest.fn()
					onKeyPressObserver.mount()

					onKeyPressObserver.subscribe(key, callback, { callStackOnce: true })

					keydown({ key: key })
					keydown({ key: key })

					expect(callback).toBeCalledTimes(1)
				}
			)

			it.each`
				key
				${'A'}
				${'B'}
				${'Escape'}
				${'Enter'}
			`(
				'On subscribe on (firstKey = $key, firstCallback, {callStackOnce: true}), (secondKey = $key, secondCallback, {callStackOnce: true}), on SECOND "keydown" event with (key === $key) secondCallback should be called once and firstCallback should be called once',
				({ key }) => {
					const firstCallback = jest.fn()
					const secondCallback = jest.fn()
					onKeyPressObserver.mount()

					onKeyPressObserver.subscribe(key, firstCallback, {
						callStackOnce: true
					})
					onKeyPressObserver.subscribe(key, secondCallback, {
						callStackOnce: true
					})

					keydown({ key: key })
					keydown({ key: key })

					expect(firstCallback).toBeCalledTimes(1)
					expect(secondCallback).toBeCalledTimes(1)
				}
			)

			it.each`
				firstKey    | secondKey
				${'A'}      | ${'T'}
				${'B'}      | ${'A'}
				${'Escape'} | ${'C'}
				${'Enter'}  | ${'H'}
			`(
				'On subscribe on (firstKey = $firstKey, firstCallback, {callStackOnce: true}), (secondKey = $secondKey, secondCallback, {callStackOnce: true}), on SECOND "keydown" event with (key === $firstKey) firstCallback should be called once and secondCallback should NOT be called',
				({ firstKey, secondKey }) => {
					const firstCallback = jest.fn()
					const secondCallback = jest.fn()
					onKeyPressObserver.mount()

					onKeyPressObserver.subscribe(firstKey, firstCallback, {
						callStackOnce: true
					})
					onKeyPressObserver.subscribe(secondKey, secondCallback, {
						callStackOnce: true
					})

					keydown({ key: firstKey })
					keydown({ key: firstKey })

					expect(firstCallback).toBeCalledTimes(1)
					expect(secondCallback).not.toBeCalled()
				}
			)

			it.each`
				firstKey    | secondKey
				${'A'}      | ${'T'}
				${'B'}      | ${'A'}
				${'Escape'} | ${'C'}
				${'Enter'}  | ${'H'}
			`(
				'On subscribe on (firstKey = $firstKey, firstCallback, {callStackOnce: true}), (secondKey = $secondKey, secondCallback, {callStackOnce: true}), on SECOND "keydown" event with (key === $secondKey) secondCallback should NOT be called and firstCallback should NOT be called',
				({ firstKey, secondKey }) => {
					const firstCallback = jest.fn()
					const secondCallback = jest.fn()
					onKeyPressObserver.mount()

					onKeyPressObserver.subscribe(firstKey, firstCallback, {
						callStackOnce: true
					})
					onKeyPressObserver.subscribe(secondKey, secondCallback, {
						callStackOnce: true
					})

					keydown({ key: secondKey })
					keydown({ key: secondKey })

					expect(firstCallback).not.toBeCalled()
					expect(secondCallback).toBeCalledTimes(1)
				}
			)
		})

		describe('toTheStackTop option', () => {
			it.each`
				key
				${'A'}
				${'B'}
				${'Escape'}
				${'Enter'}
			`(
				'On subscribe on (firstKey = $key, firstCallback), (secondKey = $key, secondCallback), and resubscribe on (firstKey = $key, firstCallback, {toTheStackTop: true}) on "keydown" event with (key === $key) firstCallback should be called and secondCallback should NOT be called',
				({ key }) => {
					const firstCallback = jest.fn()
					const secondCallback = jest.fn()
					onKeyPressObserver.mount()

					onKeyPressObserver.subscribe(key, firstCallback)
					onKeyPressObserver.subscribe(key, secondCallback)
					onKeyPressObserver.subscribe(key, firstCallback, {
						toTheStackTop: true
					})

					keydown({ key: key })

					expect(firstCallback).toBeCalled()
					expect(secondCallback).not.toBeCalled()
				}
			)
		})
	})

	describe('Every (callEveryOnPress option)', () => {
		describe('Default', () => {
			describe('Subscribe', () => {
				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (key = $key, callback, {callEveryOnPress: true}), on "keydown" event with (key === $key) callback should be called',
					({ key }) => {
						const callback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, callback, {
							callEveryOnPress: true
						})

						keydown({ key: key })

						expect(callback).toBeCalled()
					}
				)

				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (firstKey = $key, firstCallback, {callEveryOnPress: true}), (secondKey = $key, secondCallback, {callEveryOnPress: true}), on "keydown" event with (key === $key) secondCallback should be called and firstCallback should be called',
					({ key }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, firstCallback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.subscribe(key, secondCallback, {
							callEveryOnPress: true
						})

						keydown({ key: key })

						expect(firstCallback).toBeCalled()
						expect(secondCallback).toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback, {callEveryOnPress: true}), (secondKey = $secondKey, secondCallback, {callEveryOnPress: true}), on "keydown" event with (key === $firstKey) firstCallback should be called and secondCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.subscribe(secondKey, secondCallback, {
							callEveryOnPress: true
						})

						keydown({ key: firstKey })

						expect(firstCallback).toBeCalled()
						expect(secondCallback).not.toBeCalled()
					}
				)

				it.each`
					firstKey    | secondKey
					${'A'}      | ${'T'}
					${'B'}      | ${'A'}
					${'Escape'} | ${'C'}
					${'Enter'}  | ${'H'}
				`(
					'On subscribe on (firstKey = $firstKey, firstCallback), (secondKey = $secondKey, secondCallback), on "keydown" event with (key === $secondKey) secondCallback should be called and firstCallback should NOT be called',
					({ firstKey, secondKey }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(firstKey, firstCallback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.subscribe(secondKey, secondCallback, {
							callEveryOnPress: true
						})

						keydown({ key: secondKey })

						expect(firstCallback).not.toBeCalled()
						expect(secondCallback).toBeCalled()
					}
				)
			})

			describe('Unsubscribe', () => {
				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (key = $key, callback, {callEveryOnPress: true}) and unsubscribe from (key = $key, {callEveryOnPress: true}), on "keydown" event with (key === $key) callback should NOT be called',
					({ key }) => {
						const callback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, callback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.unsubscribe(key, callback, {
							callEveryOnPress: true
						})

						keydown({ key: key })

						expect(callback).not.toBeCalled()
					}
				)

				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (firstKey = $key, firstCallback, {callEveryOnPress: true}), (secondKey = $key, secondCallback, {callEveryOnPress: true}) and unsubscribe from (secondKey = $key), on "keydown" event with (key === $key) secondCallback should NOT be called and firstCallback should be called',
					({ key }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, firstCallback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.subscribe(key, secondCallback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.unsubscribe(key, secondCallback, {
							callEveryOnPress: true
						})

						keydown({ key: key })

						expect(firstCallback).toBeCalled()
						expect(secondCallback).not.toBeCalled()
					}
				)
			})

			describe('Resubscribe', () => {
				it.each`
					key
					${'A'}
					${'B'}
					${'Escape'}
					${'Enter'}
				`(
					'On subscribe on (firstKey = $key, firstCallback, {callEveryOnPress: true}), (secondKey = $key, secondCallback, {callEveryOnPress: true}) and resubscribe on (firstKey = $key, firstCallback, {callEveryOnPress: true}), on "keydown" event with (key === $key) secondCallback should be called and firstCallback should be called',
					({ key }) => {
						const firstCallback = jest.fn()
						const secondCallback = jest.fn()
						onKeyPressObserver.mount()

						onKeyPressObserver.subscribe(key, firstCallback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.subscribe(key, secondCallback, {
							callEveryOnPress: true
						})
						onKeyPressObserver.subscribe(key, firstCallback, {
							callEveryOnPress: true
						})

						keydown({ key: key })

						expect(firstCallback).toBeCalled()
						expect(secondCallback).toBeCalled()
					}
				)
			})
		})
	})
})
