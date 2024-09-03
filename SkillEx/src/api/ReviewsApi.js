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
            query: ({ receiver_id }) => `reviews/${receiver_id}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Reviews', id })), 'Reviews']
                    : ['Reviews'],
        }),
        sendReview: builder.mutation({
            query: (receiver_id, data) => ({
                url: `reviews/${receiver_id}`,
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
        })
    }),
});

export const {
    useGetReviewsQuery,
    useSendReviewMutation,
    useDeleteReviewMutation
} = reviewsApi;