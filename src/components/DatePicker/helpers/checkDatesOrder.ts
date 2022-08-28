import { dateIsBigger } from 'helpers'

export const checkDatesOrder = (date: [Date, Date]): [Date, Date] => {
	if (dateIsBigger(date[0], date[1])) {
		return [date[1], date[0]]
	}

	return date
}
