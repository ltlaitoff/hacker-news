import { getFiltrationTypeByFiltration } from 'helpers/typescript'
import {
	FilterBaseType,
	FilterDateReceived,
	FilterListReceived,
	FilterNumberReceived,
	FilterReceived,
	FilterStringReceived,
	FilterTemplate
} from 'typescript/filters'
import {
	ReducerActionChangeFiltration,
	ReducerActionChangeValue,
	ReducerActionTypes
} from './filterDetailsWindowReducer.interfaces'

export function filterDetailsWindowReducer<T extends FilterReceived>(
	state: T,
	action: ReducerActionChangeValue<T> | ReducerActionChangeFiltration<T>
): T {
	switch (action.type) {
		case ReducerActionTypes.CHANGE_VALUE: {
			if (state.value === action.payload) {
				return state
			}

			return { ...state, value: action.payload }
		}

		case ReducerActionTypes.CHANGE_FILTRATION: {
			if (state.filtration === action.payload) {
				return state
			}

			const getNewStateValue = (
				filtration: FilterReceived['filtration'],
				value: FilterReceived['value']
			) => {
				if (getFiltrationTypeByFiltration(filtration) === 'one') {
					if (value instanceof Array) {
						return value[0]
					}

					return value
				}

				if (!(value instanceof Array)) {
					return [value, value]
				}

				return value
			}

			const newValue = getNewStateValue(action.payload, state.value)

			return { ...state, filtration: action.payload, value: newValue }
		}

		default:
			return state
	}
}

export function getDefaultReducerValue(
	filter: FilterTemplate,
	currentFilter: FilterReceived | null
): FilterReceived {
	if (currentFilter && currentFilter.type !== filter.type) {
		throw new Error('currentFilter type must be strict equal filter type')
	}

	if (currentFilter) return currentFilter

	switch (filter.type) {
		case FilterBaseType.LIST: {
			return {
				id: filter.id,
				name: filter.name,
				type: filter.type,
				filtration: filter.filtrations[0],
				value: filter.listValues[0],
				listValues: filter.listValues
			} as FilterListReceived
		}

		case FilterBaseType.DATE: {
			return {
				id: filter.id,
				name: filter.name,
				type: filter.type,
				filtration: filter.filtrations[0],
				value: new Date(Date.now())
			} as FilterDateReceived
		}

		case FilterBaseType.NUMBER: {
			return {
				id: filter.id,
				name: filter.name,
				type: filter.type,
				filtration: filter.filtrations[0],
				value: 100
			} as FilterNumberReceived
		}

		case FilterBaseType.STRING: {
			return {
				id: filter.id,
				name: filter.name,
				type: filter.type,
				filtration: filter.filtrations[0],
				value: ''
			} as FilterStringReceived
		}
	}
}
