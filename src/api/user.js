import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
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
		login: builder.mutation({
			query: (body) => ({
				url: '/api/auth/login',
				method: 'POST',
				body,
			}),
		}),
		registration: builder.mutation({
			query: (body) => ({
				url: '/api/auth/registration',
				method: 'POST',
				body,
			}),
		}),
		auth: builder.query({
			query: () => '/api/auth/auth',
		}),
	}),
})

export const { useRegistrationMutation, useLoginMutation, useAuthQuery } =
	userApi
