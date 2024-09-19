import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addCategory } from '../../../../skill-ex-back/src/controllers/category.controller';

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
        }),
        editCategory: builder.mutation({
            query: (data) => ({
                url: `categories/${data.id}`,
                method: 'PATCH',
                body: data
            }),
        }),
        deleteCategory: builder.mutation({
            query: (data) => ({
                url: `categories/${data.id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
} = categoriesApi;