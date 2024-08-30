import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatsApi = createApi({
    reducerPath: "chatsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/`,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }),
    tagTypes: ["Chat"],
    endpoints: (builder) => ({
        getChats: builder.query({
            query: () => "chats/",
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: "Chat", id })), "Chat"]
                    : ["Chat"],
        }),
        createChat: builder.mutation({
            query: (data) => ({
                url: "chats/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Chat", id: arg.id }],
        }),
        deleteChat: builder.mutation({
            query: ({ reciever_id }) => ({
                url: `chats/${receiver_id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Chat", id: arg.id }, 'Messages'],
        }),
    }),
});

export const {
    useGetChatsQuery,
    useCreateChatMutation,
    useDeleteChatMutation,
} = chatsApi;
