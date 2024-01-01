import {Dimensions, Platform} from 'react-native';

export const screenH = Dimensions.get('screen').height;
export const screenW = Dimensions.get('screen').width;
export const windowH = Dimensions.get('window').height;
export const windowW = Dimensions.get('window').width;

export const KEYS = {
  STORAGE: {},
};

export const APP_STORE = {
  link: null,
};
export const PLAY_STORE = {
  link: null,
};
export const STORES = Platform.OS === 'android' ? PLAY_STORE : APP_STORE;
