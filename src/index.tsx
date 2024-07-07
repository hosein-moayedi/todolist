import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import App from './app';
import {store} from './redux/store';
import {appTheme} from './styles';

const Root = () => {
  appTheme.mode = useColorScheme() || 'light';

  return (
    <ThemeProvider theme={appTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
