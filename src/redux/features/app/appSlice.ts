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
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    setIsAppReady: (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    },
  },
});

export const {setCurrentLanguage, setIsAppReady} = appSlice.actions;

export const appReducer = appSlice.reducer;
