import React, { FC } from 'react';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from 'react-native';
import { styles } from './styles';



const CustomKeyboardAvoidingView: FC<KeyboardAvoidingViewProps> = ({ children, ...props }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'height' : 'padding'}
            style={styles.keyboardAvoidingView}
            {...props}
        >
            {children}
        </KeyboardAvoidingView>
    )
}

export default CustomKeyboardAvoidingView



