import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import * as Keychain from 'react-native-keychain'
import { useDispatch } from 'react-redux'
import STRINGS from '../../localization'
import { setIsAppReady } from '../../redux/features/app'
import { setAuthorized, setToken } from '../../redux/features/auth'
import { styles } from './styles'


export default function SplashScreen() {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const credentials = await Keychain.getGenericPassword()
            console.log('credentials: ', credentials);

            if (credentials) {

                dispatch(setToken(credentials.password))
                dispatch(setAuthorized(true))
            }
            dispatch(setIsAppReady(true))
        })()
    }, [])

    return (
        <View style={styles.viewContainer}>
            <Text>{STRINGS.screens.splash.SplashScreen}</Text>
        </View>
    )
}