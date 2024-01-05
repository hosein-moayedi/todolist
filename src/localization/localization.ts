import AsyncStorage from '@react-native-async-storage/async-storage';
import debug from '../utils/debug';
import STRINGS from './localized-strings';

type Language = 'en' | 'de';

class Localization {
  private static LOCALIZATION_KEYS = {
    CURRENT_LANGUAGE: '@localization/current_language',
  } as const;

  static LANGUAGES: Record<Language, Language> = {
    en: 'en',
    de: 'de',
  };

  static async getLanguageFromAsyncStorage(): Promise<Language | null> {
    try {
      const language = (await AsyncStorage.getItem(
        Localization.LOCALIZATION_KEYS.CURRENT_LANGUAGE,
      )) as Language | null;

      return language;
    } catch (error) {
      debug.error('Error getting language from AsyncStorage:', error);
      throw error;
    }
  }

  static async setLanguageToAsyncStorage(
    languageCode: Language,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        Localization.LOCALIZATION_KEYS.CURRENT_LANGUAGE,
        languageCode,
      );
    } catch (error) {
      debug.error('Error setting language to AsyncStorage:', error);
      throw error;
    }
  }

  static async clearLanguageInAsyncStorage(): Promise<void> {
    try {
      await AsyncStorage.removeItem(
        Localization.LOCALIZATION_KEYS.CURRENT_LANGUAGE,
      );
    } catch (error) {
      debug.error('Error clearing language in AsyncStorage:', error);
      throw error;
    }
  }

  static async setLanguage(languageCode: Language): Promise<boolean> {
    if (Localization.LANGUAGES[languageCode]) {
      try {
        await Localization.setLanguageToAsyncStorage(languageCode);
        STRINGS.setLanguage(languageCode);
        return true;
      } catch (error) {
        debug.error('Error setting language:', error);
        throw error;
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
      throw error;
    }
  }
}

export default Localization;
