import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AppState {
  isAppReady: boolean;
}

const initialState: AppState = {
  isAppReady: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppReadyState: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
  },
});

export const {setAppReadyState} = appSlice.actions;

export const appReducer = appSlice.reducer;
