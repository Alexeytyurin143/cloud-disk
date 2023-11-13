import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	theme: '',
}

export const fileSlice = createSlice({
	name: 'file',
	initialState,
	reducers: {
		setTheme(state, action) {
			state.theme = action.payload
		},
	},
})

export const { setTheme } = fileSlice.actions

export default fileSlice.reducer
