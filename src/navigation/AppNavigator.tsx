import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Miaou'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: 'Détails'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
