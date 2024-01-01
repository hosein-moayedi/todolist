/**
 * @format
 */

import { AppRegistry } from 'react-native';
import mockServer from './server';
import { name as appName } from './app.json';
import Root from './src';


mockServer()
AppRegistry.registerComponent(appName, () => Root);
