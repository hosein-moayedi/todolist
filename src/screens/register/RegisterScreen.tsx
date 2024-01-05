import { useFormik } from 'formik';
import React from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, Text, TextInput } from 'react-native';
import * as Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import * as Yup from 'yup';
import STRINGS from '../../localization';
import { navigate } from '../../navigation/RootNavigator';
import { baseSchemas, emailErrors, passwordErrors, usernameErrors } from '../../schema/base-schemas';
import { useCreateUserMutation } from '../../services/api/user';
import debug from '../../utils/debug';
import { styles } from './styles';
import { Values } from './types';



const RegisterSchema = Yup.object().shape({
    username: baseSchemas.username.required(usernameErrors.Required),
    email: baseSchemas.email.required(emailErrors.Required),
    password: baseSchemas.password.required(passwordErrors.Required),
})

export default function RegisterScreen() {
    const [createUserAPI, { isLoading }] = useCreateUserMutation();
    const { values: { username, email, password }, handleSubmit, handleChange, handleBlur } = useFormik<Values>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit
    })

    async function onSubmit() {
        try {
            const response = await createUserAPI({ username, email, password }).unwrap();
            if (response.tokens) {
                await Keychain.setGenericPassword(username, JSON.stringify(response.tokens));
                RNRestart.restart()
            }
        } catch (error) {
            debug.error(error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'height' : 'padding'}
            style={styles.viewContainer}
        >
            <Text style={styles.textMessage}>
                {STRINGS.screens.register.Register}
            </Text>
            <TextInput
                value={username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder='Username'
                style={styles.input}
            />
            <TextInput
                value={email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder='Email'
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
                        title={STRINGS.screens.register.Submit}
                        onPress={() => handleSubmit()}
                    />
            }
            <Button
                title={STRINGS.screens.register.Login}
                onPress={() => navigate('LoginScreen')}
            />
        </KeyboardAvoidingView>
    )
}





