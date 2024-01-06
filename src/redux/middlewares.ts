import {Middleware} from '@reduxjs/toolkit';
import {processServerResponseErrors} from '../services/api/helpers';

export const handleRTKQueryGlobalErrorMiddleware: Middleware =
  () => next => action => {
    processServerResponseErrors(action);
    return next(action);
  };
