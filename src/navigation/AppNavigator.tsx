import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, useColorScheme, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../screens/ChatScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import {createStyles} from '../styles/globalStyles';

const Stack = createNativeStackNavigator();

type SettingsButtonProps = {
  navigation: any;
};

const SettingsButton: React.FC<SettingsButtonProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [iconSource, setIconSource] = React.useState<any>(null);
  const styles = createStyles(isDarkMode);

  React.useEffect(() => {
    const loadIcon = async () => {
      const source = await Icon.getImageSource(
        'settings',
        24,
        isDarkMode ? '#FFFFFF' : '#000000',
      );
      setIconSource(source);
    };
    loadIcon();
  }, [isDarkMode]);

  if (!iconSource) return null;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Réglages' as never)}
      style={styles.headerIconContainer}>
      <Image source={iconSource} style={styles.headerIcon} />
    </TouchableOpacity>
  );
};

const chatScreenOptions = {
  title: 'Le Chat',
  headerBackVisible: false,
  headerRight: (props: any) => <SettingsButton navigation={props.navigation} />,
};

const RéglagesScreenOptions = {
  headerShown: false,
};

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Réglages">
        <Stack.Screen
          name="Réglages"
          component={PreferencesScreen}
          options={RéglagesScreenOptions}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={chatScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
