import { FormEvent } from 'react'
import { isEqual } from './is'
const ENTER_KEY = 'Enter'

export const isEnterKey = (key: string) => {
	return isEqual(key, ENTER_KEY)
}

export const getValueFromEvent = (e: FormEvent<HTMLInputElement>) => {
	return (e.target as HTMLInputElement).value
}
