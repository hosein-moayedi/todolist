import { useFormik } from 'formik';
import React from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, Text, TextInput } from 'react-native';
import * as Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import * as Yup from 'yup';
import STRINGS from '../../localization';
import { navigate } from '../../navigation/RootNavigator';
import { baseSchemas, emailErrors, passwordErrors, usernameErrors } from '../../schema/base-schemas';
import { getErrorMessage } from '../../services/api/helpers';
import { useCreateUserMutation } from '../../services/api/user';
import { styles } from './styles';
import { Values } from './types';



const RegisterSchema = Yup.object().shape({
    username: baseSchemas.username.required(usernameErrors.Required),
    email: baseSchemas.email.required(emailErrors.Required),
    password: baseSchemas.password.required(passwordErrors.Required),
})

export default function RegisterScreen() {
    const [createUserAPI, { isLoading }] = useCreateUserMutation();
    const { values, handleSubmit, handleChange, handleBlur } = useFormik<Values>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit
    })

    async function onSubmit(values: Values) {
        try {
            const { token } = await createUserAPI(values).unwrap();
            await Keychain.setGenericPassword(values.username, token);
            RNRestart.restart()
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
                {STRINGS.screens.register.Register}
            </Text>
            <TextInput
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder='Username'
                style={styles.input}
            />
            <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder='Email'
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
                        title={STRINGS.screens.register.Submit}
                        onPress={() => handleSubmit()}
                    />
            }
            <Button
                title={'login'}
                onPress={() => navigate('LoginScreen')}
            />
        </KeyboardAvoidingView>
    )
}





