import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './navigation/RootNavigator';


function App() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <RootNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});

export default App;
