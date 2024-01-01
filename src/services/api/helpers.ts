//@ts-nocheck
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
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
