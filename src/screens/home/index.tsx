import React from 'react';
import { Text, View } from 'react-native';
import STRINGS from '../../localization';
import { styles } from './styles';


export default function HomeScreen() {
    return (
        <View style={styles.viewContainer}>
            <Text>{STRINGS.screens.home.HelloWorld}</Text>
        </View>
    )
}