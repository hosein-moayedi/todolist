import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import STRINGS from '../../localization'
import { setIsAppReady } from '../../redux/app/appSlice'
import { styles } from './styles'


export default function SplashScreen() {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setIsAppReady(true))
        }, 3000)
    }, [])

    return (
        <View style={styles.viewContainer}>
            <Text>{STRINGS.screens.splash.AppName}</Text>
        </View>
    )
}