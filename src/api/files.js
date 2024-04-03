import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addUploadFile, changeProgress } from '../store/uploadSlice'
import { addFile } from '../store/filesSlice'

export const filesApi = createApi({
	reducerPath: 'filesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
		prepareHeaders: (headers) => {
			headers.set(
				'Authorization',
				`Bearer ${localStorage.getItem('token')}`
			)
			return headers
		},
		tagTypes: ['Files'],
	}),
	endpoints: (builder) => ({
		getFiles: builder.query({
			query: ({ dirId, sort }) => {
				let url = '/api/files'
				if (dirId) {
					url = `/api/files?parent=${dirId}`
				}
				if (sort) {
					url = `/api/files?sort=${sort}`
				}
				if (dirId && sort) {
					url = `/api/files?parent=${dirId}&sort=${sort}`
				}
				return url
			},
		}),
		createDir: builder.mutation({
			query: ({ dirId, name }) => ({
				url: '/api/files',
				method: 'POST',
				body: {
					name,
					parent: dirId,
					type: 'dir',
				},
			}),
		}),
		deleteFile: builder.mutation({
			query: (file) => ({
				url: `/api/files?id=${file._id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export function upload(file, dirId) {
	return async (dispatch) => {
		const xhr = new XMLHttpRequest()
		xhr.open('POST', 'http://localhost:3000/api/files/upload')
		xhr.setRequestHeader(
			'Authorization',
			`Bearer ${localStorage.getItem('token')}`
		)

		const formData = new FormData()
		formData.append('file', file)
		if (dirId) {
			formData.append('parent', dirId)
		}

		let uploadFile = {
			name: file.name,
			progress: 0,
			id: Date.now(),
		}

		dispatch(addUploadFile(uploadFile))

		xhr.upload.onprogress = function (event) {
			if (event.lengthComputable) {
				let progress = (event.loaded / event.total) * 100
				uploadFile = { ...uploadFile, progress: progress }
				dispatch(changeProgress(uploadFile))
			}
		}

		xhr.onload = function () {
			if (xhr.status === 200) {
				dispatch(addFile(JSON.parse(xhr.response)))
			} else {
				const error = JSON.parse(xhr.response)
				alert(error.message)
			}
		}

		xhr.onerror = function () {
			const error = JSON.parse(xhr.response)
			alert(error.message)
		}

		xhr.send(formData)
	}
}

export const download = async (file) => {
	const response = await fetch(
		`http://localhost:3000/api/files/download?id=${file._id}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	)
	if (response.status === 200) {
		const blob = await response.blob()
		const downloadUrl = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = downloadUrl
		link.download = file.name
		document.body.appendChild(link)
		link.click()
		link.remove()
	}
}

export const { useGetFilesQuery, useCreateDirMutation, useDeleteFileMutation } =
	filesApi
