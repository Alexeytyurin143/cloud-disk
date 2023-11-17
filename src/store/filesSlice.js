import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentDir: null,
	files: [],
}

export const fileSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		setCurrentDir(state, action) {
			state.currentDir = action.payload
		},
		setFiles(state, action) {
			state.files = action.payload
		},
	},
})

export const { setCurrentDir, setFiles } = fileSlice.actions

export default fileSlice.reducer
