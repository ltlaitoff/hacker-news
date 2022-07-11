import { FormEvent } from 'react'
import { isEqual } from './is'
// TODO: Move constants in another file
const ENTER_KEY = 'Enter'
const ESCAPE_KEY = 'Escape'

export const isEnterKey = (key: string) => {
	return isEqual(key, ENTER_KEY)
}

export const isEscapeKey = (key: string) => {
	return isEqual(key, ESCAPE_KEY)
}

export const getValueFromEvent = (e: FormEvent<HTMLInputElement>) => {
	return (e.target as HTMLInputElement).value
}
