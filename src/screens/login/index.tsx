import React from 'react';
import { Button, Text, View } from 'react-native';
import STRINGS from '../../localization';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setAuthorized } from '../../redux/user/userSlice';

export default function LoginScreen() {
    const dispatch = useDispatch()

    const onLoginButtonPress = () => {
        dispatch(setAuthorized(true))
    }

    return (
        <View style={styles.viewContainer}>
            <Text>{STRINGS.screens.login.Login}</Text>
            <Button title={STRINGS.screens.login.Enter} onPress={onLoginButtonPress} />
        </View>
    )
}