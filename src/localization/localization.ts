import AsyncStorage from '@react-native-async-storage/async-storage';
import STRINGS from './localized-strings';

class Localization {
  /**
   * Keys for AsyncStorage and others
   */
  static #LOCALIZATION_KEYS = {
    CURRENT_LANGUAGE: '@localization/current_language',
  };

  /**
   * Available languages in the application
   */
  static LANGUAGES = {
    en: 'en',
    de: 'de',
  };

  /**
   * Get current language code from async storage
   * @returns {String}
   */
  static async getLanguageFromAsyncStorage() {
    try {
      const language = await AsyncStorage.getItem(
        this.#LOCALIZATION_KEYS.CURRENT_LANGUAGE,
      );

      if (!language) {
        return Promise.reject(null);
      }

      return language;
    } catch {
      //
    }
  }

  /**
   * Set language code to async storage
   * @param {String} languageCode - code of the language
   * @returns {Promise<void>}
   */
  static async setLanguageToAsyncStorage(
    languageCode: keyof typeof this.LANGUAGES,
  ) {
    try {
      await AsyncStorage.setItem(
        this.#LOCALIZATION_KEYS.CURRENT_LANGUAGE,
        languageCode,
      );
    } catch (error) {
      //
    }
  }

  /**
   * Clear current language code in async storage
   * @returns {Promise<void>}
   */
  static async clearLanguageInAsyncStorage() {
    try {
      await AsyncStorage.removeItem(this.#LOCALIZATION_KEYS.CURRENT_LANGUAGE);
    } catch (error) {
      //
    }
  }

  /**
   * Change language if it exist
   * @param {String} languageCode - code of the language
   */
  static async setLanguage(languageCode: keyof typeof this.LANGUAGES) {
    if (this.LANGUAGES[languageCode]) {
      try {
        await this.setLanguageToAsyncStorage(languageCode);
        STRINGS.setLanguage(languageCode);
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}

export default Localization
