import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Localization} from './localization';
import RootNavigation from './navigation/RootNavigator';
import debug from './utils/debug';

const App = () => {
  const [languageIsReady, setLanguageIsReady] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        await Localization.initialize();
        setLanguageIsReady(true);
      } catch (error) {
        debug.error('Error initializing app language:', error);
      }
    };

    initializeLanguage();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {languageIsReady && <RootNavigation />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
});

export default App;
