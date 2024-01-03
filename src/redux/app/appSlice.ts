import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AppState {
  currentLanguage: string;
  isAppReady: boolean;
}

const initialState: AppState = {
  currentLanguage: 'en',
  isAppReady: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    setAppReadyState: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
  },
});

export const {changeCurrentLanguage, setAppReadyState} = appSlice.actions;

export const appReducer = appSlice.reducer;
