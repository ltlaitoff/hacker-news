import { FilterReceived } from 'typescript/filters'
import {
	ReducerActionChangeFiltration,
	ReducerActionChangeValue,
	ReducerActionTypes
} from './filterDetailsWindowReducer.interfaces'

export function changeValue<T extends FilterReceived>(
	value: T['value']
): ReducerActionChangeValue<T> {
	return { type: ReducerActionTypes.CHANGE_VALUE, payload: value }
}

export function changeFilttration<T extends FilterReceived>(
	filtration: T['filtration']
): ReducerActionChangeFiltration<T> {
	return { type: ReducerActionTypes.CHANGE_FILTRATION, payload: filtration }
}
