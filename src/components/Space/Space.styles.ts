import {StyleSheet} from 'react-native';

export const getStyles = ({size}: {size: number}) =>
  StyleSheet.create({
    horizontal: {
      width: size,
    },
    vertical: {
      height: size,
    },
  });
