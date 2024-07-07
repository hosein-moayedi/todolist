//@ts-noCheck
import {isRejectedWithValue} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import STRINGS from '../../localization';

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is {message: string} {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

export function getErrorMessage(error) {
  if (isFetchBaseQueryError(error)) {
    const errMsg = 'error' in error ? error.error : error.data.error;
    return errMsg;
  } else if (isErrorWithMessage(error)) {
    return error.message;
  }
}

export function processServerResponseErrors(action) {
  if (isRejectedWithValue(action)) {
    const {status} = action.payload;
    if (status >= 400) {
      switch (true) {
        case status === 400:
          Alert.alert(
            STRINGS.errors.server.default.ErrorMessage,
            getErrorMessage(action.payload),
          );
          break;
        case status === 401:
          RNRestart.restart();
          break;
        case status === 403:
          Alert.alert(
            STRINGS.errors.server.default.AccessDenied,
            STRINGS.errors.server.default.DoNotHavePermission,
          );
          break;
        case status === 404:
          Alert.alert(
            STRINGS.errors.server.default.ResourceNotFound,
            STRINGS.errors.server.default
              .RequestedResourceNotFoundPleaseTryAgain,
          );
          break;
        case status >= 500:
          Alert.alert(
            STRINGS.errors.server.default.SomethingWentWrong,
            STRINGS.errors.server.default.SomethingWrongTryAgainLater,
          );
          break;
        default:
          Alert.alert(
            STRINGS.errors.server.default.UnknownError,
            STRINGS.errors.server.default.SomethingWrongTryAgainLater,
          );
          break;
      }
    }
  }
}
