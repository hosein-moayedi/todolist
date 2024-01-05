import AsyncStorage from '@react-native-async-storage/async-storage';
import debug from '../utils/debug';
import STRINGS from './localized-strings';

class Localization {
  private static LOCALIZATION_KEYS = {
    CURRENT_LANGUAGE: '@localization/current_language',
  } as const;

  static LANGUAGES = {
    en: 'en',
    de: 'de',
  } as const;

  static async getLanguageFromAsyncStorage(): Promise<
    keyof typeof Localization.LANGUAGES | null
  > {
    try {
      const language = (await AsyncStorage.getItem(
        Localization.LOCALIZATION_KEYS.CURRENT_LANGUAGE,
      )) as keyof typeof Localization.LANGUAGES | null;

      return language || null;
    } catch (error) {
      debug.error('Error getting language from AsyncStorage:', error);
      return null;
    }
  }

  static async setLanguageToAsyncStorage(
    languageCode: keyof typeof Localization.LANGUAGES,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        Localization.LOCALIZATION_KEYS.CURRENT_LANGUAGE,
        languageCode,
      );
    } catch (error) {
      debug.error('Error setting language to AsyncStorage:', error);
    }
  }

  static async clearLanguageInAsyncStorage(): Promise<void> {
    try {
      await AsyncStorage.removeItem(
        Localization.LOCALIZATION_KEYS.CURRENT_LANGUAGE,
      );
    } catch (error) {
      debug.error('Error clearing language in AsyncStorage:', error);
    }
  }

  static async setLanguage(
    languageCode: keyof typeof Localization.LANGUAGES,
  ): Promise<boolean> {
    if (Localization.LANGUAGES[languageCode]) {
      try {
        await Localization.setLanguageToAsyncStorage(languageCode);
        STRINGS.setLanguage(languageCode);
        return true;
      } catch (error) {
        debug.error('Error setting language:', error);
      }
    }
    return false;
  }

  static async initialize(): Promise<void> {
    try {
      const language =
        (await Localization.getLanguageFromAsyncStorage()) ||
        Localization.LANGUAGES.en;
      await Localization.setLanguage(language);
    } catch (error) {
      debug.error('Error initializing Localization:', error);
    }
  }
}

export default Localization;
