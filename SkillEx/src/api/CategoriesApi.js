import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/`,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories/`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Categories', id })), 'Categories']
                    : ['Categories'],
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: `categories/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Categories", id: arg.id }],
        }),
        editCategory: builder.mutation({
            query: (data) => ({
                url: `categories/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Categories", id: arg.id }],
        }),
        deleteCategory: builder.mutation({
            query: (data) => ({
                url: `categories/${data.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Categories", id: arg.id }],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;