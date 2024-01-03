import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../../../redux/store';
import {API_URL} from '../constants';
import {
  CreateUserRequestBody,
  CreateUserResponse,
  LoginUserRequestBody,
  LoginUserResponse,
  RefreshTokenRequestBody,
  RefreshTokenResponse,
} from './types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/v1/users',
    prepareHeaders: (headers, {getState}) => {
      const tokens = (getState() as RootState).auth.tokens;
      if (tokens) {
        headers.set('authorization', tokens.access);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    createUser: builder.mutation<CreateUserResponse, CreateUserRequestBody>({
      query: ({username, email, password}) => ({
        url: '/',
        method: 'POST',
        body: {
          username,
          email,
          password,
        },
      }),
    }),
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequestBody>({
      query: ({username, password}) => ({
        url: '/login',
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
    }),
    refreshToken: builder.mutation<
      RefreshTokenResponse,
      RefreshTokenRequestBody
    >({
      query: ({refreshToken}) => ({
        url: '/refresh-token',
        method: 'POST',
        body: {
          refreshToken,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
} = userAPI;
