interface DateMinMax {
	min: number
	max: number
}

export enum GetMinMaxType {
	DAY = 'day',
	MONTH = 'month',
	YEAR = 'year'
}

export const dayMinMax: DateMinMax = {
	min: 1,
	max: 31
}

export const monthMinMax: DateMinMax = {
	min: 1,
	max: 12
}

export const yearMinMax: DateMinMax = {
	min: 1900,
	max: 2100
}

export const getMinMax = (type: GetMinMaxType): DateMinMax | null => {
	switch (type) {
		case GetMinMaxType.DAY:
			return dayMinMax
		case GetMinMaxType.MONTH:
			return monthMinMax
		case GetMinMaxType.YEAR:
			return yearMinMax
	}

	return null
}
