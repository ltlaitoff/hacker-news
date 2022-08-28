import { FilterReceived } from 'typescript/filters'

export enum ReducerActionTypes {
	CHANGE_VALUE = 'change_value',
	CHANGE_FILTRATION = 'change_filtration'
}
interface ReducerActionType {
	type: ReducerActionTypes
	payload: unknown
}

export interface ReducerActionChangeValue<T extends FilterReceived>
	extends ReducerActionType {
	type: ReducerActionTypes.CHANGE_VALUE
	payload: T['value']
}

export interface ReducerActionChangeFiltration<T extends FilterReceived>
	extends ReducerActionType {
	type: ReducerActionTypes.CHANGE_FILTRATION
	payload: T['filtration']
}
