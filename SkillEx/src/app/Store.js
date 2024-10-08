import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../api/AuthApi";
import { usersApi } from "../api/UsersApi";
import { messagesApi } from "../api/MessagesApi";
import { chatsApi } from "../api/ChatsApi";
import { reviewsApi } from "../api/ReviewsApi";
import { categoriesApi } from "../api/CategoriesApi";
import { receiverReducer } from "./slices/receiverSlice";
import { videoReceiverReducer } from "./slices/videoReceiverSlice";

const store = configureStore({
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers({
            autoBatch: { type: 'tick' },
        }),
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [chatsApi.reducerPath]: chatsApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        receiver: receiverReducer,
        videoReceiver: videoReceiverReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            usersApi.middleware,
            chatsApi.middleware,
            messagesApi.middleware,
            reviewsApi.middleware,
            categoriesApi.middleware,
        ])
})

setupListeners(store.dispatch);

export default store