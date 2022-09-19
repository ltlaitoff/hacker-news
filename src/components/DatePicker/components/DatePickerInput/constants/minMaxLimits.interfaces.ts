export interface DateMinMax {
	min: number
	max: number
}

export enum GetMinMaxType {
	DAY = 'day',
	MONTH = 'month',
	YEAR = 'year'
}

export interface MinMaxLimitsType {
	day: DateMinMax
	month: DateMinMax
	year: DateMinMax
}
