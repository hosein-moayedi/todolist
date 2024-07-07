import {Button, Input, Text} from '@rneui/themed';
import {useFormik} from 'formik';
import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import Keychain from 'react-native-keychain';
import RNRestart from 'react-native-restart';
import * as Yup from 'yup';
import {CustomKeyboardAvoidingView, Space} from '../../components';
import STRINGS from '../../localization';
import {navigate} from '../../navigation/RootNavigator';
import {
  baseSchemas,
  passwordErrors,
  usernameErrors,
} from '../../schema/base-schemas';
import {useLoginUserMutation} from '../../services/api/user';
import debug from '../../utils/debug';
import {styles} from './styles';
import {Values} from './types';

const LoginSchema = Yup.object().shape({
  username: baseSchemas.username.required(usernameErrors.Required),
  password: baseSchemas.password.required(passwordErrors.Required),
});

const LoginScreen: FC = () => {
  const [loginWithCredentialAPI, {isLoading}] = useLoginUserMutation();
  const {
    values: {username, password},
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<Values>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  async function onSubmit() {
    try {
      const response = await loginWithCredentialAPI({
        username,
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
        {STRINGS.screens.login.Login}
      </Text>
      <View style={styles.inputContainer}>
        <Input
          value={username}
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          placeholder="Username"
          errorMessage={touched.username ? errors.username : undefined}
        />
        <Input
          value={password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder="Password"
          errorMessage={touched.password ? errors.password : undefined}
          secureTextEntry={true}
        />
        <Space size={60} />
        <Button
          title={STRINGS.screens.login.Submit}
          onPress={onPressSubmit}
          loading={isLoading}
          raised
        />
        <Button
          title={STRINGS.screens.login.Register}
          onPress={() => navigate('RegisterScreen')}
          type="clear"
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default LoginScreen;
