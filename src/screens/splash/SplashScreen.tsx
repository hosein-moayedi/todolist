import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import * as Keychain from 'react-native-keychain'
import RNRestart from 'react-native-restart'
import { useDispatch } from 'react-redux'
import STRINGS from '../../localization'
import { setAppReadyState } from '../../redux/app'
import { setAuthorizedState, setTokensState } from '../../redux/auth'
import { useRefreshTokenMutation } from '../../services/api/user'
import { styles } from './styles'


export default function SplashScreen() {
    const dispatch = useDispatch()
    const [refreshTokenAPI,] = useRefreshTokenMutation()

    useEffect(() => {
        (async () => {
            try {
                const credentials = await Keychain.getGenericPassword()
                if (credentials) {
                    const tokens = await JSON.parse(credentials.password)
                    const nowTime = new Date().getTime()

                    if (tokens.expiry <= nowTime) {
                        const newTokens = await refreshTokenAPI({ refreshToken: tokens.refresh }).unwrap()
                        await Keychain.setGenericPassword(credentials.username, JSON.stringify(newTokens.tokens))
                    }
                    
                    dispatch(setTokensState(tokens))
                    dispatch(setAuthorizedState(true))
                }
                dispatch(setAppReadyState(true))
            } catch (error) {
                console.log(error);
                await Keychain.resetGenericPassword()
                RNRestart.restart()
            }
        })()
    }, [])

    return (
        <View style={styles.viewContainer}>
            <Text>{STRINGS.screens.splash.SplashScreen}</Text>
        </View>
    )
}