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
    setIsAppReady: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
  },
});

export const {setIsAppReady} = appSlice.actions;

export default appSlice.reducer;
