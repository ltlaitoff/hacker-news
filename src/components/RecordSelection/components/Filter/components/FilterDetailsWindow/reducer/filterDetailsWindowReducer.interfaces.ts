import { FilterReceived } from 'typescript/filters'

interface ReducerActionType {
	type: string
	payload: unknown
}

export interface ReducerActionChangeValue<T extends FilterReceived>
	extends ReducerActionType {
	type: 'change-value'
	payload: T['value']
}

export interface ReducerActionChangeFiltration<T extends FilterReceived>
	extends ReducerActionType {
	type: 'change-filtration'
	payload: T['filtration']
}
