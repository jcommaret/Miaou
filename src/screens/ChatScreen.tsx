// Imports React et hooks de base
import React, { useState, useEffect, useRef } from "react";

// Composants React Native
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

// Hooks de navigation
import { useRoute, useNavigation } from "@react-navigation/native";

// Hook pour détecter le thème système
import { useColorScheme } from "react-native";

// Service API Mistral
import { createMistralAPI } from "../services";

// Types
import type { ChatScreenRouteProp, ChatMessage, Message } from "../types";

// Styles
import { Styles } from "../styles";

// Ajoutez cet import en haut du fichier
import { MISTRAL_API_KEY, MISTRAL_MODEL } from "@env";

export function ChatScreen(): React.JSX.Element {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === "dark";
  const styles = Styles(isDarkMode);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const apiKey = MISTRAL_API_KEY;
  const modelId = MISTRAL_MODEL;

  useEffect(() => {
    console.log("API Key:", MISTRAL_API_KEY); // À retirer après le test
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
    };
    setMessages([welcomeMessage]);
  }, [navigation, route.params]);

  // Fonction pour scroller vers le bas
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  // Gestion du scroll automatique (doit rester séparé car dépend de messages)
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const mistralAPI = createMistralAPI(apiKey);
      const chatMessages: ChatMessage[] = messages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }));

      chatMessages.push({
        role: "user",
        content: inputText,
      });

      const responseContent = await mistralAPI.sendChatMessage(
        modelId,
        chatMessages
      );

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: responseContent,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue";
      console.error("Erreur lors de l'envoi du message:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={styles.chatContainer}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageRole,
                  item.isUser && styles.userMessageRole,
                ]}
              >
                {item.isUser ? "Vous" : "Le chat"}
              </Text>
              <Text
                style={[
                  styles.messageText,
                  item.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
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
            placeholderTextColor={isDarkMode ? "#666" : "#999"}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[
              styles.chatSendButton,
              isLoading && styles.chatSendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={isLoading || !inputText.trim()}
          >
            <Text style={styles.chatSendButtonText}>
              {isLoading ? "Envoi..." : "Envoyer"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
