import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {createStyles} from '../styles/globalStyles';
import type {RootStackParamList} from '../types/navigation';
import {createMistralAPI, type ChatMessage} from '../services';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

function ChatScreen(): React.JSX.Element {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!route.params?.apiKey || !route.params?.modelId) {
      navigation.navigate('Home' as never);
      return;
    }
  }, [navigation, route.params]);

  const {apiKey, modelId} = route.params || {};

  // Fonction pour scroller vers le bas
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  // Scroll automatique quand un nouveau message est ajouté
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Message d'accueil au chargement
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Bonjour ! Je suis votre assistant Mistral. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const mistralAPI = createMistralAPI(apiKey);
      const chatMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
      }));

      chatMessages.push({
        role: 'user',
        content: inputText,
      });

      const responseContent = await mistralAPI.sendChatMessage(
        modelId,
        chatMessages,
      );

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: responseContent,
        isUser: false,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Une erreur inattendue est survenue';
      console.error("Erreur lors de l'envoi du message:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={styles.chatContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageContainer,
                item.isUser ? styles.userMessage : styles.aiMessage,
              ]}>
              <Text
                style={[
                  styles.messageRole,
                  item.isUser && styles.userMessageRole,
                ]}>
                {item.isUser ? 'Vous' : 'Assistant'}
              </Text>
              <Text
                style={[
                  styles.messageText,
                  item.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}>
                {item.text}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />
        {error && <Text style={styles.chatErrorText}>{error}</Text>}
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Tapez votre message..."
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[
              styles.chatSendButton,
              isLoading && styles.chatSendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={isLoading || !inputText.trim()}>
            <Text style={styles.chatSendButtonText}>
              {isLoading ? 'Envoi...' : 'Envoyer'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default ChatScreen;
