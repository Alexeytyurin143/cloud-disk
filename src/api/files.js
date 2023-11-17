import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const filesApi = createApi({
	reducerPath: 'filesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	}),
	endpoints: (builder) => ({
		getFiles: builder.query({
			query: (dirId) => `/api/files${dirId ? `?parent=${dirId}` : ''}`,
		}),
	}),
})

export const { useGetFilesQuery } = filesApi
