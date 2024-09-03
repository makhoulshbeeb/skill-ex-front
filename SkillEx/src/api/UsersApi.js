import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/`,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    tagTypes: ['User', 'Me'],
    endpoints: (builder) => ({
        getUserByToken: builder.query({
            query: () => 'users/me',
            providesTags: ['Me']
        }),
        getUsersBySearch: builder.query({
            query: ({ search }) => `users/search/${search}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
                    : ['User'],
        }),
        getUserByUsername: builder.query({
            query: ({ username }) => `users/${username}`,
            providesTags: ['User'],
        }),
        getUsersByMatch: builder.query({
            query: () => `users/match/`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
                    : ['User'],
        }),
        updateUser: builder.mutation({
            query: (id, data) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Me'],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Me'],
        })
    }),
});

export const {
    useGetUsersBySearchQuery,
    useGetUserByUsernameQuery,
    useGetUsersByMatchQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;