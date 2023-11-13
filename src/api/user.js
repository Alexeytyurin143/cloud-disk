import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
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
	}),
})

export const { useRegistrationMutation, useLoginMutation } = userApi
