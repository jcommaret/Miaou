import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MistralModel {
  id: string;
  name: string;
  created: number;
}

// Storage Service
class StorageService {
  private keys = {
    API_KEY: 'api_key',
    SELECTED_MODEL: 'selected_model',
  } as const;

  async saveApiKey(apiKey: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.keys.API_KEY, apiKey);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la clé API:', error);
      throw error;
    }
  }

  async getApiKey(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.keys.API_KEY);
    } catch (error) {
      console.error('Erreur lors de la récupération de la clé API:', error);
      throw error;
    }
  }

  async saveSelectedModel(modelId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.keys.SELECTED_MODEL, modelId);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du modèle:', error);
      throw error;
    }
  }

  async getSelectedModel(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.keys.SELECTED_MODEL);
    } catch (error) {
      console.error('Erreur lors de la récupération du modèle:', error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.keys.API_KEY,
        this.keys.SELECTED_MODEL,
      ]);
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
      throw error;
    }
  }
}

// Mistral API Service
class MistralAPI {
  private baseUrl = 'https://api.mistral.ai/v1';

  constructor(private apiKey: string) {}

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  async sendChatMessage(
    modelId: string,
    messages: ChatMessage[],
  ): Promise<string> {
    const data = await this.fetchAPI('/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: modelId,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    });

    return data.choices[0].message.content;
  }

  async getAvailableModels(): Promise<MistralModel[]> {
    const data = await this.fetchAPI('/models');
    return data.data;
  }
}

// Exports
export const storage = new StorageService();
export const createMistralAPI = (apiKey: string) => new MistralAPI(apiKey);
export type {ChatMessage, MistralModel};
