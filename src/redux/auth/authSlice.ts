import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  tokens: {
    access: string;
    refresh: string;
    expiry: number;
  } | null;
  authorized: boolean;
}

const initialState: AuthState = {
  tokens: null,
  authorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokensState: (state, action: PayloadAction<AuthState['tokens']>) => {
      state.tokens = action.payload;
    },
    setAuthorizedState: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
  },
});

export const {setTokensState, setAuthorizedState} = authSlice.actions;

export const authReducer = authSlice.reducer;
