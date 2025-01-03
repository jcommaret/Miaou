import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, useColorScheme, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../screens/ChatScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import {createStyles} from '../styles/globalStyles';

const Stack = createNativeStackNavigator();

type SettingsButtonProps = {
  navigation: any;
  icon: any;
};

const SettingsButton: React.FC<SettingsButtonProps> = ({navigation, icon}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Réglages' as never)}
      style={styles.headerIconContainer}>
      <Image source={icon} style={styles.headerIcon} />
    </TouchableOpacity>
  );
};

const getChatScreenOptions = (navigation: any, settingsIcon: any) => ({
  title: 'Le Chat',
  headerBackVisible: false,
  headerRight: () =>
    settingsIcon ? (
      <SettingsButton navigation={navigation} icon={settingsIcon} />
    ) : null,
});

export function AppNavigator(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [settingsIcon, setSettingsIcon] = React.useState<any>(null);

  React.useEffect(() => {
    const loadIcon = async () => {
      const icon = await MaterialIcons.getImageSource(
        'settings',
        24,
        isDarkMode ? '#FFFFFF' : '#000000',
      );
      setSettingsIcon(icon);
    };
    loadIcon();
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Réglages">
        <Stack.Screen
          name="Réglages"
          component={PreferencesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({navigation}) =>
            getChatScreenOptions(navigation, settingsIcon)
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
