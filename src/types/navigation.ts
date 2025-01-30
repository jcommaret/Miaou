import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Réglages: undefined;
  Chat: {
    apiKey: string;
    modelId: string;
  };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
