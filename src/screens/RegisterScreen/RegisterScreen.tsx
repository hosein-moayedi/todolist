import {Button, Icon, Input, Text} from '@rneui/themed';
import {useFormik} from 'formik';
import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import * as Yup from 'yup';
import {CustomKeyboardAvoidingView} from '../../components';
import STRINGS from '../../localization';
import {navigate} from '../../navigation/RootNavigator';
import {
  baseSchemas,
  emailErrors,
  passwordErrors,
  usernameErrors,
} from '../../schema/base-schemas';
import {useCreateUserMutation} from '../../services/api/user';
import debug from '../../utils/debug';
import {styles} from './styles';
import {Values} from './types';

const RegisterSchema = Yup.object().shape({
  username: baseSchemas.username.required(usernameErrors.Required),
  email: baseSchemas.email.required(emailErrors.Required),
  password: baseSchemas.password.required(passwordErrors.Required),
});

const RegisterScreen: FC = () => {
  const [createUserAPI, {isLoading}] = useCreateUserMutation();
  const {
    values: {username, email, password},
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<Values>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit,
  });

  async function onSubmit() {
    try {
      const response = await createUserAPI({
        username,
        email,
        password,
      }).unwrap();
      if (response.tokens) {
        await Keychain.setGenericPassword(
          username,
          JSON.stringify(response.tokens),
        );
        RNRestart.restart();
      }
    } catch (error) {
      debug.error(error);
    }
  }

  const onPressSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <CustomKeyboardAvoidingView>
      <Text h3 style={styles.textMessage}>
        {STRINGS.screens.register.Register}
      </Text>
      <View
        style={{width: '90%', alignItems: 'center', justifyContent: 'center'}}>
        <Input
          value={username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          placeholder="Username"
          errorMessage={touched.username ? errors.username : undefined}
          leftIcon={<Icon name="person" type="Ionicons" />}
          // style={styles.input}
        />
        <Input
          value={email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          placeholder="Email"
          errorMessage={touched.email ? errors.email : undefined}
          leftIcon={<Icon name="mail" type="Ionicons" />}
          // style={styles.input}
        />
        <Input
          value={password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder="Password"
          errorMessage={touched.password ? errors.password : undefined}
          leftIcon={<Icon name="lock" type="Ionicons" />}
          rightIcon={<Icon name="eye-outline" type="ionicon" />}
          secureTextEntry={true}
          // style={styles.input}
        />
        <View style={{height: 60}} />

        <Button
          title={STRINGS.screens.register.Submit}
          onPress={onPressSubmit}
          loading={isLoading}
          raised
        />
        <Button
          title={STRINGS.screens.register.Login}
          onPress={() => navigate('LoginScreen')}
          type="clear"
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default RegisterScreen;
