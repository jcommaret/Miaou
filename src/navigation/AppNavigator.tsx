import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, useColorScheme, Image} from 'react-native';
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import {createStyles} from '../styles/globalStyles';

const Stack = createNativeStackNavigator();

const SettingsButton = ({navigation, icon}: {navigation: any; icon: any}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Preferences' as never)}
      style={styles.headerIconContainer}>
      <Image source={icon} style={styles.headerIcon} />
    </TouchableOpacity>
  );
};

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

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },
    headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
    headerTitleStyle: {
      fontWeight: '600',
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: 'Miaou',
            headerRight: () =>
              settingsIcon ? (
                <SettingsButton navigation={navigation} icon={settingsIcon} />
              ) : null,
          })}
        />
        <Stack.Screen
          name="Preferences"
          component={PreferencesScreen}
          options={{title: 'Préférences'}}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({navigation}) => ({
            title: 'Chat',
            headerRight: () =>
              settingsIcon ? (
                <SettingsButton navigation={navigation} icon={settingsIcon} />
              ) : null,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
