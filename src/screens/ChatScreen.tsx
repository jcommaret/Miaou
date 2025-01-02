import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../types/navigation';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

function ChatScreen(): React.JSX.Element {
  const route = useRoute<ChatScreenRouteProp>();
  const {apiKey, modelId} = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!inputText.trim() || isLoading) {
      return;
    }

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
      const chatMessages = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
      }));

      chatMessages.push({role: 'user', content: inputText});

      const response = await fetch(
        'https://api.mistral.ai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: modelId,
            messages: chatMessages,
            temperature: 0.7,
            max_tokens: 1000,
            stream: true,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const {done, value} = await reader.read();
          if (done) break;

          // Convertir le Uint8Array en texte
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              if (jsonStr === '[DONE]') continue;

              try {
                const jsonData = JSON.parse(jsonStr);
                const content = jsonData.choices[0]?.delta?.content;
                if (content) {
                  fullResponse += content;
                }
              } catch (e) {
                console.error('Error parsing JSON:', e);
              }
            }
          }
        }
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: fullResponse,
        isUser: false,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      setError("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageContainer,
              item.isUser ? styles.userMessage : styles.aiMessage,
            ]}>
            <Text style={styles.messageRole}>
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
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez votre message..."
          placeholderTextColor="#666"
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={isLoading || !inputText.trim()}>
          <Text style={styles.sendButtonText}>
            {isLoading ? 'Envoi...' : 'Envoyer'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    margin: 8,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E9EB',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  messagesContainer: {
    padding: 16,
  },
  messageRole: {
    fontSize: 12,
    marginBottom: 4,
    color: '#666',
  },
  errorText: {
    color: 'red',
    padding: 8,
    textAlign: 'center',
  },
});

export default ChatScreen;
