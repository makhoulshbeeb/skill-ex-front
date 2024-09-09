import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth/`,
        credentials: 'include'
    }),
    tagTypes: ['Me'],
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "signup",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            invalidatesTags: ['Me']
        }),
    }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } =
    authApi;
