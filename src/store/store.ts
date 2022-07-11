import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filters'
import searchReducer from './searches'

export const store = configureStore({
	reducer: {
		filters: filterReducer,
		searches: searchReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
