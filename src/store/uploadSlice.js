import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isVisible: false,
	files: [],
}

export const uploadSlice = createSlice({
	name: 'upload',
	initialState,
	reducers: {
		showUploader(state) {
			state.isVisible = true
		},
		hideUploader(state) {
			state.isVisible = false
		},
		clearFiles(state) {
			state.files = []
		},
		addUploadFile(state, action) {
			state.isVisible = true
			state.files.push(action.payload)
		},
		deleteUploadFile(state, action) {
			state.files = state.files.filter(
				(file) => file.id !== action.payload
			)
		},
		changeProgress(state, action) {
			state.files = state.files.map((file) =>
				file.id == action.payload.id
					? { ...file, progress: action.payload.progress }
					: { ...file }
			)
		},
	},
})

export const {
	showUploader,
	hideUploader,
	addUploadFile,
	clearFiles,
	deleteUploadFile,
	changeProgress,
} = uploadSlice.actions

export default uploadSlice.reducer
