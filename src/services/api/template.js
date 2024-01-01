/**
 * @prettier
 * @perfect - PS
 */

import ky from 'ky';
import RNRestart from 'react-native-restart';
import AuthService from '../auth';
import { URL } from '../config';
import CronJob from '../cron-job';
import debug from '../debug';


/**
 * This one makes api requests on entire application
 */
const api = ky.extend({
  retry: {
    limit: 3,
    methods: ['get', 'post', 'put', 'delete', 'patch'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  timeout: 60000,
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          const token = await AuthService.getAuthToken();
          if (token?.password) {
            request.headers.set('Authorization', `Token ${token.password}`);
          }
        } catch (error) {
          debug.error('Failed to set auth token beforeRequest', error);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        try {
          if (response.status === 401) {
            if (
              request.url !== URL + '/device/logout/' &&
              request.url !== URL + '/device/validate_phone/'
            ) {
              if (request.url !== URL + '/device/update/') {
                const _request = await AuthService.updateUserToken();
                if (_request) {
                  const token = await AuthService.getAuthToken();
                  if (token?.username) {
                    const expireTimeMs = Date.parse(token?.username);
                    // ---
                    // At the first app login "token.username" will a user's email but then it is token expared time
                    // That's need for the following condition
                    // ---
                    if (isNaN(expireTimeMs) || Date.now() > expireTimeMs) {
                      await AuthService.setAuthToken(_request.expiry, _request.token);
                      return ky(request);
                    } else {
                      await AuthService.logOutCurrentToken();
                    }
                  }
                }
              } else {
                await AuthService.resetAuthMode();
                await AuthService.removeAuthToken();
                await AuthService.resetPinCode();
                await AuthService.resetBiometrics();
                await AuthService.resetExpireDateAuthToken();

                await CronJob.clean();
                RNRestart.Restart();
              }
            }
          }
        } catch (error) {
          debug.error(
            'Failed to update auth token by refresh one after unsuccessful response with 401 status code',
            error,
          );
        }
      },
    ],
  },
});

export default api;
