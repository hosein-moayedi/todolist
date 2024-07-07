import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';
import {styles} from './CustomKeyboardAvoidingView.styles';

const CustomKeyboardAvoidingView: FC<KeyboardAvoidingViewProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      style={[styles.keyboardAvoidingView, style]}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default React.memo(CustomKeyboardAvoidingView);
