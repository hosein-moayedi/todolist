import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as SCREENS from '../../../screens';


const NonAuthorizedScreensStack = createNativeStackNavigator();

export const NON_AUTHORIZED_SCREEN_STACK = {
  LoginScreen: {
    name: 'LoginScreen',
    component: SCREENS.LoginScreen,
  }
};

const NonAuthorizedStack = () => {
  return (
    <NonAuthorizedScreensStack.Navigator
      initialRouteName={NON_AUTHORIZED_SCREEN_STACK.LoginScreen.name}
    >
      <NonAuthorizedScreensStack.Screen
        name={NON_AUTHORIZED_SCREEN_STACK.LoginScreen.name}
        component={NON_AUTHORIZED_SCREEN_STACK.LoginScreen.component}
        options={{ headerShown: false }}
      />
    </NonAuthorizedScreensStack.Navigator>
  );
};

export default NonAuthorizedStack;
