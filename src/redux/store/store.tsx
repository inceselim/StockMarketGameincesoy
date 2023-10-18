import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../features/authSlice";
import stockSlice from '../features/stockSlice';
import daySlice from '../features/daySlice';

export const store = configureStore({
    reducer: {
        authentication: authSlice,
        stockSlice: stockSlice,
        daySlice: daySlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch