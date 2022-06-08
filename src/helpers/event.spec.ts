import { isEnterKey, isEscapeKey, getValueFromEvent } from './event'
import { FormEvent } from 'react'

describe('event', () => {
	it.each`
		arg        | result
		${'tab'}   | ${false}
		${'Enter'} | ${true}
		${123}     | ${false}
		${null}    | ${false}
	`('isEnterKey with arg = $arg should return $result', ({ arg, result }) => {
		expect(isEnterKey(arg)).toBe(result)
	})

	it.each`
		arg         | result
		${'tab'}    | ${false}
		${'Enter'}  | ${false}
		${'Escape'} | ${true}
		${123}      | ${false}
		${null}     | ${false}
	`('isEscapeKey with arg = $arg should return $result', ({ arg, result }) => {
		expect(isEscapeKey(arg)).toBe(result)
	})

	it.each`
		value
		${'test'}
		${1}
		${'gh'}
		${null}
	`(
		'getValueFromEvent with e =  { target: { value: $value } } should return $value',
		({ value }) => {
			const data: FormEvent<HTMLInputElement> = {
				// @ts-ignore
				target: { value: value }
			}

			expect(getValueFromEvent(data)).toBe(value)
		}
	)
})
