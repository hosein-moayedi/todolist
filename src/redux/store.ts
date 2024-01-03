import {configureStore} from '@reduxjs/toolkit';
import {userAPI} from '../services/api/user';
import {appReducer, appSlice} from './app';
import {authReducer, authSlice} from './auth';
import {rtkQueryGlobalErrorHandlerMiddleware} from './middlewares';

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      rtkQueryGlobalErrorHandlerMiddleware,
    ),
});

// Infer the `RootState` and `RootDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootDispatch = typeof store.dispatch;
