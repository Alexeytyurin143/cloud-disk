import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import userReducer from './userSlice'
import filesReducer from './filesSlice'
import { userApi } from '../api/user'
import { filesApi } from '../api/files'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
	reducer: {
		app: appReducer,
		user: userReducer,
		files: filesReducer,
		[filesApi.reducerPath]: filesApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware, filesApi.middleware),
})

setupListeners(store.dispatch)
