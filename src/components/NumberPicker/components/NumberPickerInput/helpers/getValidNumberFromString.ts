import { checkOnMinMaxIncludes } from 'helpers'

export const getValidNumberFromString = (
	string: string,
	{ max, min }: { max: number; min: number }
): number | null => {
	if (string.length === 0) return null

	if (string.split('').map(Number).includes(NaN)) return null

	const number = Number(string)

	if (!checkOnMinMaxIncludes(number, { min, max })) return null

	return number
}
