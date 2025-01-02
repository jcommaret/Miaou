import React, {useState, useEffect, useCallback} from 'react';
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

import {createStyles} from '../styles/globalStyles';
import {storage, createMistralAPI, type MistralModel} from '../services';
import {useConfigurationStore} from '../services/configurationService';
import {ChatAccessButton} from '../components/ChatAccessButton';

function PreferencesScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [apiKey, setApiKey] = useState('');
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);
  const [availableModels, setAvailableModels] = useState<MistralModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const styles = createStyles(isDarkMode);
  const {checkConfiguration} = useConfigurationStore();

  const loadSavedData = useCallback(async () => {
    try {
      const [savedKey, savedModel] = await Promise.all([
        storage.getApiKey(),
        storage.getSelectedModel(),
      ]);

      if (savedKey) {
        setApiKey(savedKey);
        const mistralAPI = createMistralAPI(savedKey);
        try {
          const models = await mistralAPI.getAvailableModels();
          setIsValidKey(true);
          setAvailableModels(models);
          if (models.length > 0) {
            setSelectedModel(savedModel || models[0].id);
          }
          await checkConfiguration();
        } catch (error) {
          setIsValidKey(false);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  }, [checkConfiguration]);

  useEffect(() => {
    loadSavedData();
  }, [loadSavedData]);

  const handleApiKeyChange = async (value: string) => {
    setApiKey(value);
    try {
      await storage.saveApiKey(value);
      setIsValidKey(null);
      await checkConfiguration();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la clé API:', error);
    }
  };

  const verifyApiKey = async () => {
    try {
      const mistralAPI = createMistralAPI(apiKey);
      const models = await mistralAPI.getAvailableModels();
      setIsValidKey(true);
      setAvailableModels(models);
      if (models.length > 0) {
        setSelectedModel(models[0].id);
        await storage.saveSelectedModel(models[0].id);
      }
      await checkConfiguration();
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
      await checkConfiguration();
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
          <Text style={styles.title}>Préférences</Text>
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              Veuillez configurer votre clé API et sélectionner un modèle dans
              les préférences avant de commencer.
            </Text>
          </View>
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
              <Text style={[styles.label, {marginTop: 20}]}>Modèle</Text>
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
                {
                  color: isValidKey
                    ? styles.successText.color
                    : styles.errorText.color,
                },
              ]}>
              {isValidKey ? 'Clé API valide' : 'Clé API invalide'}
            </Text>
          )}

          <ChatAccessButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PreferencesScreen;
