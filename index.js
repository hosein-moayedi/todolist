/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import mockServer from './server';
import Root from './src';

mockServer();
AppRegistry.registerComponent(appName, () => Root);
