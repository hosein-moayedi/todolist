import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles';
import { goBack } from '../RootNavigator';


/**
 * Function for render custom header
 */
export const renderHeaderOptions = (title: string, headerRight?: boolean, styleType: 'light' | 'dark' = 'light') => {
  const headerOptions = {
    headerTitle: () => (
      <Text style={{ color: styleType === 'light' ? colors.textBlack : colors.textWhite }}>
        {title}
      </Text>
    ),
    headerStyle: styleType === 'light' ? styles.header : styles.headerBlack,
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerLeftContainerStyle: styles.headerLeftContainer,
    headerRightContainerStyle: styles.headerRightContainer,
    headerLeft: () => (
      <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
        {/* <Icon
          name={Platform.OS === 'ios' ? 'arrow-left' : 'arrow-left-android'}
          color={
            styleType === 'light'
              ? Platform.OS === 'ios'
                ? colors.blue
                : colors.black
              : colors.white
          }
        /> */}
      </TouchableOpacity>
    ),
    headerRight: false
  };

  if (headerRight) {
    headerOptions.headerRight = headerRight;
  }
  return headerOptions;
};

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingHorizontal: 16,
  },
  headerRightContainer: {
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4.65,
    elevation: 4,
  },
  headerBlack: {
    backgroundColor: colors.black,
    shadowOpacity: 0,
    elevation: 0,
  },
  goBackButton: {
    height: '100%',
    justifyContent: 'center',
  },
});
