import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../../../redux/store';
import {API_URL} from '../constants';
import {
  CreateUserRequestBody,
  CreateUserResponse,
  LoginUserRequestBody,
  LoginUserResponse,
} from './types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/v1/users',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    createUser: builder.mutation<CreateUserResponse, CreateUserRequestBody>({
      query: ({username, email, password}) => ({
        url: '/',
        method: 'POST',
        body: {username, email, password},
      }),
    }),
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequestBody>({
      query: ({username, password}) => ({
        url: '/login',
        method: 'POST',
        body: {username, password},
      }),
    }),
  }),
});

export const {useCreateUserMutation, useLoginUserMutation} = userAPI;
