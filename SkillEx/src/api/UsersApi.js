import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/`,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsersBySearch: builder.query({
            query: ({ search }) => `users/search/${search}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
                    : ['User'],
        }),
        getUserByUsername: builder.query({
            query: ({ username }) => `users/${username}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
                    : ['User'],
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
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
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