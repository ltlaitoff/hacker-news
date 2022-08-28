import { FilterReceived } from 'typescript/filters'
import {
	ReducerActionChangeFiltration,
	ReducerActionChangeValue
} from './filterDetailsWindowReducer.interfaces'

export function changeValue<T extends FilterReceived>(
	value: T['value']
): ReducerActionChangeValue<T> {
	return { type: 'change-value', payload: value }
}

export function changeFilttration<T extends FilterReceived>(
	filtration: T['filtration']
): ReducerActionChangeFiltration<T> {
	return { type: 'change-filtration', payload: filtration }
}
