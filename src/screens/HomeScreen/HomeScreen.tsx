import React from 'react';
import { Button, Text, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import STRINGS from '../../localization';
import { styles } from './styles';


export default function HomeScreen() {

    const onLogoutButtonPress = async () => {
        await Keychain.resetGenericPassword()
        RNRestart.restart()
    }

    return (
        <View style={styles.viewContainer}>
            <Text>{STRINGS.screens.home.HomeScreen}</Text>
            <Button
                title={STRINGS.screens.home.Logout}
                onPress={onLogoutButtonPress}
            />
        </View>
    )
}