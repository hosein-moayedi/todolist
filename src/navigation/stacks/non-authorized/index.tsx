import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as SCREENS from '../../../screens';
import { defaultScreenOptions } from '../../utils/common-screen-options';


const NonAuthorizedScreensStack = createNativeStackNavigator();

export const NON_AUTHORIZED_SCREEN_STACK = {
  LoginScreen: {
    name: 'LoginScreen',
    component: SCREENS.LoginScreen,
  },
  RegisterScreen: {
    name: 'RegisterScreen',
    component: SCREENS.RegisterScreen
  }
};

const NonAuthorizedStack = () => {
  return (
    <NonAuthorizedScreensStack.Navigator
      initialRouteName={NON_AUTHORIZED_SCREEN_STACK.RegisterScreen.name}
      screenOptions={defaultScreenOptions}
    >
      <NonAuthorizedScreensStack.Screen
        name={NON_AUTHORIZED_SCREEN_STACK.RegisterScreen.name}
        component={NON_AUTHORIZED_SCREEN_STACK.RegisterScreen.component}
      />
      <NonAuthorizedScreensStack.Screen
        name={NON_AUTHORIZED_SCREEN_STACK.LoginScreen.name}
        component={NON_AUTHORIZED_SCREEN_STACK.LoginScreen.component}
      />
    </NonAuthorizedScreensStack.Navigator>
  );
};

export default NonAuthorizedStack;
