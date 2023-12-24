import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as SCREENS from '../../../screens';


const AuthorizedScreensStack = createNativeStackNavigator();

export const AUTHORIZED_SCREEN_STACK = {
  HomeScreen: {
    name: 'HomeScreen',
    component: SCREENS.HomeScreen,
  }
};

const AuthorizedStack = () => {
  return (
    <AuthorizedScreensStack.Navigator
      initialRouteName={AUTHORIZED_SCREEN_STACK.HomeScreen.name}
    >
      <AuthorizedScreensStack.Screen
        name={AUTHORIZED_SCREEN_STACK.HomeScreen.name}
        component={AUTHORIZED_SCREEN_STACK.HomeScreen.component}
        options={{ headerShown: false }}
      />
    </AuthorizedScreensStack.Navigator>
  );
};

export default AuthorizedStack;
