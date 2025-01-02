import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Chat: {
    apiKey: string;
    modelId: string;
  };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
