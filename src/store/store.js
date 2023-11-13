import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import userReducer from './userSlice'
import { userApi } from '../api/user'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
	reducer: {
		app: appReducer,
		user: userReducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)
