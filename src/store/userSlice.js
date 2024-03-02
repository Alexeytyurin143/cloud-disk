import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentUser: {},
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.currentUser = action.payload.user
			state.isAuth = true
			localStorage.setItem('token', action.payload.token)
		},
		logOut(state) {
			state.currentUser = {}
			state.isAuth = false
			localStorage.removeItem('token')
		},
	},
})

export const { setUser, logOut } = userSlice.actions

export default userSlice.reducer
