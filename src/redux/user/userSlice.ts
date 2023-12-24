import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserState {
  authorized: boolean;
}

const initialState: UserState = {
  authorized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
  },
});

export const {setAuthorized} = userSlice.actions;

export default userSlice.reducer;
