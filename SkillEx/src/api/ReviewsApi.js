import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/`,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: ({ receiverId }) => `reviews/${receiverId}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Reviews', id }))]
                    : ['Reviews'],
        }),
        sendReview: builder.mutation({
            query: (data) => ({
                url: `reviews/${data.receiverId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Reviews', id: arg.id }],
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => ({
                url: `reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Reviews', id: arg.id }],
        }),
        deleteReviewAdmin: builder.mutation({
            query: ({ id }) => ({
                url: `reviews/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Reviews', id: arg.id }],
        })
    }),
});

export const {
    useGetReviewsQuery,
    useSendReviewMutation,
    useDeleteReviewMutation,
    useDeleteReviewAdminMutation
} = reviewsApi;