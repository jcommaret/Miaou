import React from 'react';
import {TouchableOpacity, Text, useColorScheme, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../types/navigation';
import {storage} from '../services';
import {useConfigurationStore} from '../services/configurationService';
import {createStyles} from '../styles/globalStyles';

export function ChatAccessButton(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const {isConfigured, checkConfiguration} = useConfigurationStore();

  React.useEffect(() => {
    checkConfiguration();
  }, [checkConfiguration]);

  const handleStartChat = async () => {
    if (isConfigured) {
      try {
        const [apiKey, selectedModel] = await Promise.all([
          storage.getApiKey(),
          storage.getSelectedModel(),
        ]);

        if (apiKey && selectedModel) {
          navigation.navigate('Chat', {
            apiKey,
            modelId: selectedModel,
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des paramètres:', error);
      }
    }
  };

  if (!isConfigured) {
    return <View />;
  }

  return (
    <TouchableOpacity
      style={[styles.button, styles.primaryButton]}
      onPress={handleStartChat}>
      <Text style={styles.buttonText}>Commencer le chat</Text>
    </TouchableOpacity>
  );
}
