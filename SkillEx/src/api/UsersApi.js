import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/`,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }),
    tagTypes: ['User', 'Me'],
    endpoints: (builder) => ({
        getUserByToken: builder.query({
            query: () => 'users/me',
            providesTags: (result, error, arg) => ['Me'],
        }),
        getUsersBySearch: builder.query({
            query: ({ search }) => `users/search/${search}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
                    : ['User'],
        }),
        getUserByUsername: builder.query({
            query: ({ username }) => `users/user/${username}`,
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
            query: (data) => ({
                url: `users/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Me', id: arg.id }],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Me', id: arg.id }],
        })
    }),
});

export const {
    useGetUserByTokenQuery,
    useGetUsersBySearchQuery,
    useGetUserByUsernameQuery,
    useGetUsersByMatchQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;