import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStyles} from '../styles/globalStyles';
import {NavigationProp} from '../types/navigation';
import {useConfigurationStore} from '../services/configurationService';
import {ChatAccessButton} from '../components/ChatAccessButton';

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const {checkConfiguration} = useConfigurationStore();

  useEffect(() => {
    checkConfiguration();
  }, [checkConfiguration]);

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
          <Text style={styles.title}>Bienvenue</Text>

          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              Veuillez configurer votre clé API et sélectionner un modèle dans
              les préférences avant de commencer.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Preferences' as never)}>
            <Text style={styles.buttonText}>Accéder aux préférences</Text>
          </TouchableOpacity>

          <ChatAccessButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
