import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
	}),
	endpoints: (builder) => ({
		getFiles: builder.query({
			query: (dirId) => `/api/files${dirId ? `?parent=${dirId}` : ''}`,
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
	}),
})

export const upload = async ({ file, dirId }) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open('POST', 'http://localhost:3000/api/files/upload')
		xhr.setRequestHeader(
			'Authorization',
			`Bearer ${localStorage.getItem('token')}`
		)

		xhr.upload.onprogress = function (event) {
			if (event.lengthComputable) {
				const progress = (event.loaded / event.total) * 100
				console.log(progress.toFixed(0))
			}
		}

		xhr.onload = function () {
			if (xhr.status === 200) {
				resolve(JSON.parse(xhr.response))
			} else {
				reject(new Error('Ошибка загрузки ' + xhr.status))
			}
		}

		xhr.onerror = function () {
			reject(new Error('Загрузка не удалась'))
		}

		const formData = new FormData()
		formData.append('file', file)
		if (dirId) {
			formData.append('parent', dirId)
		}

		xhr.send(formData)
	})
}

export const { useGetFilesQuery, useCreateDirMutation } = filesApi
