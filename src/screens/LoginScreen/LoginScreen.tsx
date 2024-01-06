import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native';
import Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import * as Yup from 'yup';
import { CustomKeyboardAvoidingView } from '../../components';
import STRINGS from '../../localization';
import { baseSchemas, passwordErrors, usernameErrors } from '../../schema/base-schemas';
import { useLoginUserMutation } from '../../services/api/user';
import debug from '../../utils/debug';
import { styles } from './styles';
import { Values } from './types';



const LoginSchema = Yup.object().shape({
    username: baseSchemas.username.required(usernameErrors.Required),
    password: baseSchemas.password.required(passwordErrors.Required),
})

const LoginScreen: FC = () => {
    const [loginWithCredentialAPI, { isLoading, error }] = useLoginUserMutation();
    const { values: { username, password }, handleSubmit, handleChange, handleBlur } = useFormik<Values>({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit
    })

    async function onSubmit() {
        try {
            const response = await loginWithCredentialAPI({ username, password }).unwrap();
            if (response.tokens) {
                await Keychain.setGenericPassword(username, JSON.stringify(response.tokens));
                RNRestart.restart()
            }
        } catch (error) {
            debug.error(error);
        }
    };

    return (
        <CustomKeyboardAvoidingView>
            <Text style={styles.textMessage}>
                {STRINGS.screens.login.Login}
            </Text>
            <TextInput
                value={username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder='Username'
                style={styles.input}
            />
            <TextInput
                value={password}
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
        </CustomKeyboardAvoidingView>
    )
}

export default LoginScreen




