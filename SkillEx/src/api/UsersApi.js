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
    tagTypes: ['User', 'Me', 'Information'],
    endpoints: (builder) => ({
        getUserByToken: builder.query({
            query: () => 'users/me',
            providesTags: (result, error, arg) => ['Me'],
        }),
        getAdminByToken: builder.query({
            query: () => 'users/admin',
            providesTags: (result, error, arg) => ['Me'],
        }),
        getUsersBySearch: builder.query({
            query: ({ search }) => `users/search/${search}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'User', id }))]
                    : ['User'],
        }),
        getUserByUsername: builder.query({
            query: ({ username }) => `users/user/${username}`,
            providesTags: ['User', 'Information'],
        }),
        getUsersByMatch: builder.query({
            query: () => `users/match/`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'User', id }))]
                    : ['User'],
        }),
        endorseUser: builder.mutation({
            query: ({ receiverId, categoryId }) => ({
                url: `users/endorse/${receiverId}`,
                method: 'PATCH',
                body: { categoryId }
            }),
            invalidatesTags: ['Information'],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `users/`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Me'],
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: `users/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Me'],
        }),
        deleteUserAdmin: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Me'],
        }),
    }),
});

export const {
    useGetUserByTokenQuery,
    useGetAdminByTokenQuery,
    useGetUsersBySearchQuery,
    useGetUserByUsernameQuery,
    useGetUsersByMatchQuery,
    useEndorseUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useDeleteUserAdminMutation
} = usersApi;