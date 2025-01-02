import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  API_KEY: 'api_key',
  SELECTED_MODEL: 'selected_model',
} as const;

export const storage = {
  async saveApiKey(apiKey: string) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la clé API:', error);
    }
  },

  async getApiKey() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.API_KEY);
    } catch (error) {
      console.error('Erreur lors de la récupération de la clé API:', error);
      return null;
    }
  },

  async saveSelectedModel(modelId: string) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_MODEL, modelId);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du modèle:', error);
    }
  },

  async getSelectedModel() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_MODEL);
    } catch (error) {
      console.error('Erreur lors de la récupération du modèle:', error);
      return null;
    }
  },
};
