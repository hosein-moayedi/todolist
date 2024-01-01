import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import React from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, Text, TextInput } from 'react-native';
import * as Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import * as Yup from 'yup';
import STRINGS from '../../localization';
import { baseSchemas, passwordErrors, usernameErrors } from '../../schema/base-schemas';
import { getErrorMessage } from '../../services/api/helpers';
import { useLoginUserMutation } from '../../services/api/user';
import { styles } from './styles';
import { Values } from './types';



const LoginSchema = Yup.object().shape({
    username: baseSchemas.username.required(usernameErrors.Required),
    password: baseSchemas.password.required(passwordErrors.Required),
})

export default function LoginScreen() {
    const [loginWithCredentialAPI, { isLoading, error }] = useLoginUserMutation();
    const { values, handleSubmit, handleChange, handleBlur } = useFormik<Values>({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit
    })

    async function onSubmit(values: Values) {
        try {
            const response = await loginWithCredentialAPI(values).unwrap();
            if (response.token) {
                await Keychain.setGenericPassword(values.username, response.token);
                RNRestart.restart()
            }
        } catch (error) {
            console.log(error);
            Alert.alert("User Existed", getErrorMessage(error))
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'height' : 'padding'}
            style={styles.viewContainer}
        >
            <Text style={styles.textMessage}>
                {STRINGS.screens.login.Login}
            </Text>
            <TextInput
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder='Username'
                style={styles.input}
            />
            <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder='Password'
                secureTextEntry={true}
                style={styles.input}
            />
            {
                isLoading ?
                    <ActivityIndicator /> :
                    <Button
                        title={STRINGS.screens.login.Submit}
                        onPress={() => handleSubmit()}
                    />
            }
            <Button
                title={'Clean Database'}
                onPress={() => AsyncStorage.clear()}
            />
            {error && 'status' in error ? <Text>{JSON.stringify(error.data)}</Text> : <Text>{error?.message}</Text>}
        </KeyboardAvoidingView>
    )
}





