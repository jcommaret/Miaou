import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Section} from '../components/Section';

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            <Text>App.tsx</Text>
          </Section>
          <Button
            title="Aller aux détails"
            onPress={() => navigation.navigate('Details' as never)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
