import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStyles} from '../styles/globalStyles';
import {NavigationProp} from '../types/navigation';
import {storage} from '../services/storage';

interface MistralModel {
  id: string;
  name: string;
  created: number;
}

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const [apiKey, setApiKey] = useState('');
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);
  const [availableModels, setAvailableModels] = useState<MistralModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const styles = createStyles(isDarkMode);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const [savedKey, savedModel] = await Promise.all([
          storage.getApiKey(),
          storage.getSelectedModel(),
        ]);

        if (savedKey) {
          setApiKey(savedKey);
          // Vérifie automatiquement la clé API au chargement
          verifyApiKey(savedKey);
        }
        if (savedModel) {
          setSelectedModel(savedModel);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    loadSavedData();
  }, []);

  const handleApiKeyChange = async (value: string) => {
    setApiKey(value);
    try {
      await storage.saveApiKey(value);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la clé API:', error);
    }
  };

  const verifyApiKey = async (key?: string) => {
    try {
      const response = await fetch('https://api.mistral.ai/v1/models', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key || apiKey}`,
        },
      });

      const isValid = response.status === 200;
      setIsValidKey(isValid);

      if (isValid) {
        const data = await response.json();
        setAvailableModels(data.data);
        if (data.data.length > 0) {
          setSelectedModel(data.data[0].id);
        }
      }

      console.log('Statut de la clé API:', isValid ? 'Valide' : 'Invalide');
    } catch (error) {
      console.error('Erreur lors de la vérification de la clé API:', error);
      setIsValidKey(false);
      setAvailableModels([]);
    }
  };

  const handleModelSelect = async (modelId: string) => {
    setSelectedModel(modelId);
    try {
      await storage.saveSelectedModel(modelId);
      setIsPickerVisible(false);
      navigation.navigate('Chat', {
        apiKey: apiKey,
        modelId: modelId,
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du modèle:', error);
    }
  };

  const renderModelItem = ({item}: {item: MistralModel}) => (
    <TouchableOpacity
      style={[
        styles.modelItem,
        selectedModel === item.id && styles.selectedModelItem,
      ]}
      onPress={() => {
        handleModelSelect(item.id);
        setIsPickerVisible(false);
      }}>
      <Text
        style={[
          styles.modelItemText,
          selectedModel === item.id && styles.selectedModelItemText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleStartChat = () => {
    if (isValidKey && selectedModel) {
      navigation.navigate('Chat', {
        apiKey: apiKey,
        modelId: selectedModel,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Clé API Mistral</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={handleApiKeyChange}
            placeholder="Entrez votre clé API"
            placeholderTextColor={styles.placeholderTextColor.color}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={verifyApiKey}>
            <Text style={styles.buttonText}>Vérifier la clé API</Text>
          </TouchableOpacity>

          {isValidKey && availableModels.length > 0 && (
            <>
              <Text style={[styles.label, {marginTop: 20}]}>
                Modèles disponibles
              </Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setIsPickerVisible(true)}>
                <Text style={styles.pickerButtonText}>
                  {availableModels.find(m => m.id === selectedModel)?.name ||
                    'Sélectionnez un modèle'}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={isPickerVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsPickerVisible(false)}>
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setIsPickerVisible(false)}>
                  <View style={styles.modalContent}>
                    <FlatList
                      data={availableModels}
                      renderItem={renderModelItem}
                      keyExtractor={item => item.id}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          )}

          {isValidKey !== null && (
            <Text
              style={[
                styles.validationText,
                {color: isValidKey ? 'green' : 'red'},
              ]}>
              {isValidKey ? 'Clé API valide' : 'Clé API invalide'}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleStartChat}>
          <Text style={styles.buttonText}>Commencer le chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
