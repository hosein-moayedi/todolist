import React, {FC} from 'react';
import {Button, Text, View} from 'react-native';
import Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import STRINGS from '../../localization';
import {styles} from './styles';

const HomeScreen: FC = () => {
  const onLogoutButtonPress = async () => {
    await Keychain.resetGenericPassword();
    RNRestart.restart();
  };

  return (
    <View style={styles.viewContainer}>
      <Text>{STRINGS.screens.home.HomeScreen}</Text>
      <Button
        title={STRINGS.screens.home.Logout}
        onPress={onLogoutButtonPress}
      />
    </View>
  );
};

export default HomeScreen;
