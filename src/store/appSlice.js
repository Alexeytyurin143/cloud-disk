import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	darkMode: true,
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setTheme(state, action) {
			state.darkMode = action.payload
		},
	},
})

export const { setTheme } = appSlice.actions

export default appSlice.reducer
