import {create} from 'zustand';
import {storage} from './index';

interface ConfigurationState {
  isConfigured: boolean;
  setIsConfigured: (value: boolean) => void;
  checkConfiguration: () => Promise<void>;
}

export const useConfigurationStore = create<ConfigurationState>(set => ({
  isConfigured: false,
  setIsConfigured: (value: boolean) => set({isConfigured: value}),
  checkConfiguration: async () => {
    try {
      const [apiKey, selectedModel] = await Promise.all([
        storage.getApiKey(),
        storage.getSelectedModel(),
      ]);
      set({isConfigured: Boolean(apiKey && selectedModel)});
    } catch (error) {
      console.error(
        'Erreur lors de la vérification de la configuration:',
        error,
      );
      set({isConfigured: false});
    }
  },
}));
