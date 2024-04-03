import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentDir: null,
	files: [],
	dirStack: [],
	sort: 'type',
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
		setSort(state, action) {
			state.sort = action.payload
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
	setSort,
} = fileSlice.actions

export default fileSlice.reducer
