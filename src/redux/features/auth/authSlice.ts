import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  authorized: boolean;
}

const initialState: AuthState = {
  token: null,
  authorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
  },
});

export const {setToken, setAuthorized} = authSlice.actions;

export const authReducer = authSlice.reducer;
