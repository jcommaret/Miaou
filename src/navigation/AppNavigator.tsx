// React
import React from "react";

// Librairies externes
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

// Imports locaux
import { ChatScreen } from "../screens";
import { RootStackParamList } from "../types";
import { createNavigationTheme } from "../styles";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const theme = createNavigationTheme(isDarkMode);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Chat"
        screenOptions={{
          headerShown: true,
          headerTitle: "Le chat",
        }}
      >
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
