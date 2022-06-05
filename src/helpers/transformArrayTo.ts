export const transformArrayToNumbersArray = (array: string[]): number[] => {
	return array.map(element => Number(element))
}
