import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/`,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }),
    tagTypes: ['Messages'],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (receiverId) => `messages/${receiverId}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Messages', id })), 'Messages']
                    : ['Messages'],
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `messages/send/${data.receiverId}`,
                method: 'POST',
                body: data
            }),
        }),
        deleteMessage: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}`,
                method: 'DELETE',
            }),
        })
    }),
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useDeleteMessageMutation
} = messagesApi;