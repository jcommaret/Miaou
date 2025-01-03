import React, {useState, useEffect, useCallback, useMemo} from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const styles = createStyles(isDarkMode);
  const {checkConfiguration} = useConfigurationStore();

  const handleModels = useCallback(
    async (key: string) => {
      if (!key || isLoading) return null;

      setIsLoading(true);
      try {
        console.log('🔄 Chargement des modèles...');
        const mistralAPI = createMistralAPI(key);
        const models = await mistralAPI.getAvailableModels();
        console.log('📥 Modèles reçus:', models);

        // Déduplique les modèles avant de les stocker
        const uniqueModels = Array.from(
          new Set(models.map(m => JSON.stringify(m))),
        ).map(s => JSON.parse(s));
        console.log('✨ Modèles dédupliqués:', uniqueModels);

        setIsValidKey(true);
        setAvailableModels(uniqueModels);

        const savedModel = await storage.getSelectedModel();
        console.log('💾 Modèle sauvegardé:', savedModel);
        const modelToSelect =
          savedModel && uniqueModels.find(m => m.id === savedModel)
            ? savedModel
            : uniqueModels[0].id;
        console.log('🎯 Modèle sélectionné:', modelToSelect);

        setSelectedModel(modelToSelect);
        await storage.saveSelectedModel(modelToSelect);
        return uniqueModels;
      } catch (error) {
        console.error('❌ Erreur lors de la récupération des modèles:', error);
        setIsValidKey(false);
        setAvailableModels([]);
        setSelectedModel('');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const loadSavedData = useCallback(async () => {
    try {
      const savedKey = await storage.getApiKey();
      if (savedKey) {
        setApiKey(savedKey);
        const models = await handleModels(savedKey);
        if (models) {
          await checkConfiguration();
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  }, [handleModels, checkConfiguration]);

  // Utilise useEffect une seule fois au montage
  useEffect(() => {
    const init = async () => {
      await loadSavedData();
    };
    init();
  }, []); // Intentionnellement vide pour n'exécuter qu'au montage

  const handleApiKeyChange = async (value: string) => {
    setApiKey(value);
    setIsValidKey(null);
    try {
      await storage.saveApiKey(value);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la clé API:', error);
    }
  };

  const verifyApiKey = async () => {
    const models = await handleModels(apiKey);
    if (models) {
      await checkConfiguration();
    }
  };

  const handleModelSelect = async (modelId: string) => {
    setSelectedModel(modelId);
    setIsPickerVisible(false);
    try {
      await storage.saveSelectedModel(modelId);
      await checkConfiguration();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du modèle:', error);
    }
  };

  // Ajout du useMemo pour dédupliquer les modèles une seule fois
  const uniqueModels = useMemo(() => {
    console.log('🔄 Recalcul des modèles uniques...');
    console.log('📊 Modèles disponibles:', availableModels);
    const unique = Array.from(
      new Set(availableModels.map(m => JSON.stringify(m))),
    ).map(s => JSON.parse(s));
    console.log('✨ Nouveaux modèles uniques:', unique);
    return unique;
  }, [availableModels]);

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
        {item.id}
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

          {isValidKey && (
            <>
              <Text style={styles.label}>Modèle</Text>
              <TouchableOpacity
                style={styles.modelSelector}
                onPress={() => setIsPickerVisible(true)}>
                <Text style={styles.modelSelectorText}>
                  {selectedModel || 'Sélectionner un modèle'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <Modal
            visible={isPickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsPickerVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Sélectionner un modèle</Text>
                <FlatList
                  data={uniqueModels}
                  renderItem={renderModelItem}
                  keyExtractor={item => item.id}
                  style={styles.modelList}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsPickerVisible(false)}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
