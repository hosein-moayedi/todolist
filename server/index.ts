// @ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Model, Response, belongsTo, createServer, hasMany} from 'miragejs';
import CryptoJS from 'react-native-crypto-js';

const saveDataToLocalStorage = async schema => {
  try {
    const {users, tokens} = schema.db;
    await AsyncStorage.setItem('@todo-db', JSON.stringify({users, tokens}));
  } catch (error) {
    console.error(error);
  }
};

const loadDataFromLocalStorage = async schema => {
  try {
    const data = await AsyncStorage.getItem('@todo-db');
    if (data) {
      schema.db.loadData(JSON.parse(data));
    }
  } catch (error) {
    console.error(error);
  }
};

export default function () {
  let EXPIRATION_PERIOD = 360000;

  createServer({
    urlPrefix: 'https://mockserver.com',
    namespace: '/api/v1',
    models: {
      user: Model.extend({
        tokens: hasMany(),
      }),
      token: Model.extend({
        user: belongsTo(),
      }),
    },
    seeds: async server => {
      await loadDataFromLocalStorage(server.schema);
    },
    routes() {
      this.post('/users', async (schema, request) => {
        const {username, email, password} = JSON.parse(request.requestBody);

        if (!username || !email || !password) {
          return new Response(
            400,
            {},
            {error: 'username, email and password should not be empty'},
          );
        }

        if (schema.users.findBy({username}) || schema.users.findBy({email})) {
          return new Response(
            400,
            {},
            {error: 'username or email is existed!'},
          );
        }

        const newUser = schema.users.create({
          username,
          email: email.toLowerCase(),
          password,
        });
        const tokens = {
          access: CryptoJS.lib.WordArray.random(64).toString(),
          refresh: CryptoJS.lib.WordArray.random(64).toString(),
          expiry: new Date().getTime() + EXPIRATION_PERIOD,
        };
        const newTokens = schema.tokens.create({user: newUser, ...tokens});

        await saveDataToLocalStorage(schema);

        return new Response(
          200,
          {},
          {
            user: {
              id: newUser.attrs.id,
              username: newUser.attrs.username,
              email: newUser.attrs.email,
            },
            tokens: newTokens,
          },
        );
      });

      this.post('/users/login', async (schema, request) => {
        const {username, password} = JSON.parse(request.requestBody);

        if (!username || !password) {
          return new Response(
            400,
            {},
            {error: 'username and password should not be empty'},
          );
        }

        const user = schema.users.findBy({
          username: username.toLowerCase(),
          password: password,
        });

        if (!user) {
          return new Response(401, {}, {error: 'Invalid username or password'});
        }

        const tokens = schema.tokens.findBy({
          userId: user.id,
        });

        return new Response(
          200,
          {},
          {
            user: {
              id: user.attrs.id,
              username: user.attrs.username,
              email: user.attrs.email,
            },
            tokens,
          },
        );
      });

      this.post('/users/refresh-token', async (schema, request) => {
        const {refreshToken} = JSON.parse(request.requestBody);

        if (!refreshToken) {
          return new Response(
            400,
            {},
            {error: 'refreshToken should not be empty'},
          );
        }

        const expiredTokens = schema.tokens.findBy({refresh: refreshToken});
        if (!expiredTokens) {
          return new Response(401, {}, {error: 'Invalid refresh token'});
        }

        const user = schema.users.findBy({id: expiredTokens.userId});

        const tokens = {
          access: CryptoJS.lib.WordArray.random(64).toString(),
          refresh: CryptoJS.lib.WordArray.random(64).toString(),
          expiry: new Date().getTime() + EXPIRATION_PERIOD,
        };

        const newTokens = schema.tokens.create({
          user,
          ...tokens,
        });

        expiredTokens.destroy();

        await saveDataToLocalStorage(schema);
        return new Response(
          200,
          {},
          {
            tokens: newTokens,
          },
        );
      });
    },
  });
}
