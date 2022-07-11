interface DateMinMax {
	min: number
	max: number
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

export type GetMinMaxType = 'day' | 'month' | 'year'
export const getMinMax = (type: GetMinMaxType): DateMinMax | null => {
	switch (type) {
		case 'day':
			return dayMinMax
		case 'month':
			return monthMinMax
		case 'year':
			return yearMinMax
	}

	return null
}
