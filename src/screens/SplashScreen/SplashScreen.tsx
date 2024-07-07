import React, {FC, useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
import STRINGS from '../../localization';
import {setAppReadyState} from '../../redux/app';
import {setAuthorizedState, setTokensState} from '../../redux/auth';
import {useRefreshTokenMutation} from '../../services/api/user';
import debug from '../../utils/debug';
import {styles} from './styles';

const SplashScreen: FC = () => {
  const dispatch = useDispatch();
  const [refreshTokenAPI] = useRefreshTokenMutation();

  const handleTokenRefresh = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const tokens = JSON.parse(credentials.password);
        const nowTime = new Date().getTime();

        if (tokens.expiry <= nowTime) {
          const newTokens = await refreshTokenAPI({
            refreshToken: tokens.refresh,
          }).unwrap();
          await Keychain.setGenericPassword(
            credentials.username,
            JSON.stringify(newTokens.tokens),
          );
        }

        dispatch(setTokensState(tokens));
        dispatch(setAuthorizedState(true));
      }
    } catch (error) {
      debug.error(error);
      await Keychain.resetGenericPassword();
      RNRestart.restart();
    }
  }, [dispatch, refreshTokenAPI]);

  const handleAppReady = useCallback(() => {
    setTimeout(() => dispatch(setAppReadyState(true)), 1000);
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await handleTokenRefresh();
      handleAppReady();
    })();
  }, [handleTokenRefresh, handleAppReady]);

  return (
    <View style={styles.viewContainer}>
      <Text>{STRINGS.screens.splash.SplashScreen}</Text>
    </View>
  );
};

export default SplashScreen;
