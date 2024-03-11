import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentDir: null,
	files: [],
	dirStack: [],
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
		addFile(state, action) {
			state.files.push(action.payload)
		},
		deleteFileAction(state, action) {
			state.files = state.files.filter(
				(file) => file._id !== action.payload
			)
		},
		pushToStack(state, action) {
			state.dirStack.push(action.payload)
		},
		popFromStack(state) {
			state.dirStack.pop()
		},
	},
})

export const {
	setCurrentDir,
	setFiles,
	addFile,
	pushToStack,
	popFromStack,
	deleteFileAction,
} = fileSlice.actions

export default fileSlice.reducer
