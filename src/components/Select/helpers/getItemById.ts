import { SelectRecord } from '../Select.interfaces'

export const getSelectRecordItemById = (
	items: SelectRecord[],
	id: number
): SelectRecord => {
	return items.filter(item => item.id === id)[0]
}
