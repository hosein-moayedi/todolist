import {configureStore} from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import userReducer from './user/userSlice';
import localizationReducer from './localization/localizationSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    localization: localizationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
