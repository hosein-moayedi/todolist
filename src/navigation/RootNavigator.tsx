import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/routers';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SplashScreen } from '../screens';
import AuthorizedStack from './stacks/authorized';
import NonAuthorizedStack from './stacks/non-authorized';

/**
 * Ref of application navigation
 */
export let navigationRef = React.createRef<NavigationContainerRef<any>>();

/**
 * Navigate to route by name
 * @param {String} name - name of route
 * @param {Object} params - navigation params
 */
export const navigate = (name: string, params?: any) => {
  if (navigationRef?.current)
    navigationRef.current.navigate(name, params);
};

/**
 * Replace route by name
 * @param {String} name - name of route
 * @param {Object} params - navigation params
 */
export const replace = (name: string, params?: any) => {
  if (navigationRef?.current)
    navigationRef.current.dispatch(StackActions.replace(name, params));
};

/**
 * Go back in routing
 */
export const goBack = () => {
  if (navigationRef?.current)
    navigationRef.current.goBack();
};

/**
 * Application navigation
 */
const RootNavigation = () => {
  const { isAppReady } = useSelector((store: RootState) => store.app)
  const { authorized } = useSelector((store: RootState) => store.user)

  if (__DEV__ && navigationRef) useFlipper(navigationRef)

  if (!isAppReady)
    return <SplashScreen />

  return (
    <NavigationContainer ref={navigationRef}>
      {authorized ? <AuthorizedStack /> : <NonAuthorizedStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
