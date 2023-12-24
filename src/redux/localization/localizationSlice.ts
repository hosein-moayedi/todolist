import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface LocalizationState {
  language: string;
}

const initialState: LocalizationState = {
  language: 'en',
};

export const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {setLanguage} = localizationSlice.actions;

export default localizationSlice.reducer;
