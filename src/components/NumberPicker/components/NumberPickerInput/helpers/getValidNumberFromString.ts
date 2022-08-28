/*
	`
	string
	${''}
	${'1e3'}
	${'1.3'}
	${'Infinity'}
	`
	getValidNumberFromString with string = $string should return null
	
	`
	string
	${'-1'}
	${'-100'}
	${'-999'}
	`
	getValidNumberFromString with string = $string and aboveZero = true should return null

	`
	string | result
	${'1'} | ${1}
	${'0'} | ${0}
	${'1000'} | ${1000}
	`

	getValidNumberFromString with string = $string and aboveZero = true should return null

*/
import { checkOnMinMax } from '../../../helpers'

export const getValidNumberFromString = (
	string: string,
	{ max, min }: { max: number; min: number }
): number | null => {
	if (string.length === 0) return null

	if (string.split('').map(Number).includes(NaN)) return null

	const number = Number(string)

	if (checkOnMinMax(number, { min, max })) return null

	return number
}
