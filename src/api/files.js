import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addUploadFile, changeProgress } from '../store/uploadSlice'
import { addFile } from '../store/filesSlice'
import { baseUrl } from './config'

export const filesApi = createApi({
	reducerPath: 'filesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers) => {
			headers.set(
				'Authorization',
				`Bearer ${localStorage.getItem('token')}`
			)
			return headers
		},
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
		searchFiles: builder.query({
			query: (search) => {
				if (search.length !== 0) {
					return `/api/files/search?search=${search}`
				} else {
					return '/api/files'
				}
			},
		}),
		uploadAvatar: builder.mutation({
			query: (data) => ({
				url: '/api/files/avatar',
				method: 'POST',
				body: data,
			}),
		}),
		deleteAvatar: builder.mutation({
			query: () => ({
				url: '/api/files/avatar',
				method: 'DELETE',
			}),
		}),
	}),
})

export const upload = (file, dirId) => {
	return async (dispatch) => {
		const xhr = new XMLHttpRequest()
		xhr.open('POST', `${baseUrl}/api/files/upload`)
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
		`${baseUrl}/api/files/download?id=${file._id}`,
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

export const {
	useGetFilesQuery,
	useCreateDirMutation,
	useDeleteFileMutation,
	useLazySearchFilesQuery,
	useUploadAvatarMutation,
	useDeleteAvatarMutation,
} = filesApi
