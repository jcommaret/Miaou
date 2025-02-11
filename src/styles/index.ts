import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import type { Theme } from "@react-navigation/native";

// Constants
export const ICON_SETTINGS = {
  size: 24,
  lightColor: "#000000",
  darkColor: "#FFFFFF",
};

export const createNavigationTheme = (isDarkMode: boolean): Theme => ({
  dark: isDarkMode,
  colors: {
    primary: "#ff7000",
    background: isDarkMode ? "#000000" : "#ffffff",
    card: isDarkMode ? "#1a1a1a" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#000000",
    border: isDarkMode ? "#333333" : "#cccccc",
    notification: "#ff7000",
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "System",
      fontWeight: "bold",
    },
    heavy: {
      fontFamily: "System",
      fontWeight: "900",
    },
  },
});

export const Styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    // Layout containers
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      padding: 20,
      height: "100%",
      width: "100%",
    },
    safeAreaContainer: {
      flex: 1,
    },
    navigationHeader: {
      backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
      tintColor: isDarkMode ? "#FFFFFF" : "#000000",
    },

    // Typography
    text: {
      fontSize: 16,
      color: isDarkMode ? Colors.light : Colors.dark,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: isDarkMode ? "#FFFFFF" : "#000000",
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: "600",
      color: isDarkMode ? Colors.light : Colors.dark,
    },

    // Form elements
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? "#444" : "#ccc",
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
      color: isDarkMode ? Colors.light : Colors.dark,
      backgroundColor: isDarkMode ? "#222" : "#fff",
    },
    placeholderTextColor: {
      color: isDarkMode ? "#666" : "#999",
    },

    // Buttons
    button: {
      backgroundColor: "#ffffff",
      padding: 12,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
    primaryButton: {
      backgroundColor: "#ff7000",
      marginTop: 10,
    },
    disabledButton: {
      backgroundColor: "#ccc",
    },
    disabledButtonText: {
      color: "#666",
    },
    closeButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: isDarkMode ? "#333333" : "#e0e0e0",
      borderRadius: 5,
      alignItems: "center",
    },
    closeButtonText: {
      color: isDarkMode ? "#ffffff" : "#000000",
      fontSize: 16,
    },

    // Model selector
    modelSelector: {
      borderWidth: 1,
      borderColor: isDarkMode ? "#444" : "#ccc",
      padding: 12,
      borderRadius: 5,
      marginBottom: 15,
    },
    modelSelectorText: {
      color: isDarkMode ? "#ffffff" : "#000000",
      fontSize: 16,
    },
    modelItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#444" : "#eee",
    },
    selectedModelItem: {
      backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
    },
    modelItemText: {
      color: isDarkMode ? Colors.light : Colors.dark,
      fontSize: 16,
    },
    selectedModelItemText: {
      fontWeight: "600",
    },

    // Modal
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: isDarkMode ? "#222" : "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      width: "100%",
      paddingBottom: 30,
      alignItems: "center",
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: isDarkMode ? "#666" : "#ccc",
      borderRadius: 2,
      marginBottom: 15,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 15,
      textAlign: "center",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    modelList: {
      maxHeight: 300,
      width: "100%",
    },
    // Chat
    chatContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
      paddingBottom: 20,
    },
    chatInputContainer: {
      flexDirection: "row",
      padding: 8,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? "#333" : "#ccc",
      backgroundColor: isDarkMode ? Colors.black : "#fff",
    },
    chatInput: {
      flex: 1,
      marginRight: 8,
      padding: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? "#444" : "#ccc",
      borderRadius: 16,
      maxHeight: 100,
      color: isDarkMode ? "#fff" : "#000",
      backgroundColor: isDarkMode ? "#222" : "#fff",
    },
    chatSendButton: {
      backgroundColor: "#ff7000",
      padding: 8,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 80,
      height: 36,
    },
    chatSendButtonDisabled: {
      backgroundColor: "#ccc",
    },
    chatSendButtonText: {
      color: "#fff",
      fontWeight: "600",
    },
    messagesContainer: {
      padding: 16,
    },
    messageContainer: {
      margin: 8,
      padding: 12,
      borderRadius: 12,
      maxWidth: "80%",
    },
    messageText: {
      fontSize: 16,
    },
    userMessage: {
      alignSelf: "flex-end",
      backgroundColor: "#ff7000",
    },
    userMessageText: {
      color: "#fff",
    },
    aiMessage: {
      alignSelf: "flex-start",
      backgroundColor: isDarkMode ? "#333" : "#E9E9EB",
    },
    aiMessageText: {
      color: isDarkMode ? "#fff" : "#000",
    },
    messageRole: {
      fontSize: 12,
      marginBottom: 4,
      color: isDarkMode ? "#999" : "#666",
    },
    userMessageRole: {
      color: "#fff",
    },

    // Header
    headerIconContainer: {
      marginRight: 15,
      padding: 5,
    },
    headerIcon: {
      width: ICON_SETTINGS.size,
      height: ICON_SETTINGS.size,
      tintColor: isDarkMode
        ? ICON_SETTINGS.darkColor
        : ICON_SETTINGS.lightColor,
    },

    // Status and feedback
    validationText: {
      marginTop: 8,
      fontSize: 14,
      textAlign: "center",
    },
    successText: {
      color: "#2ECC71",
    },
    errorText: {
      color: "#E74C3C",
    },
    chatErrorText: {
      color: "red",
      padding: 8,
      textAlign: "center",
    },
    warningContainer: {
      backgroundColor: "#FFF3CD",
      padding: 15,
      borderRadius: 8,
      marginBottom: 20,
    },
    warningText: {
      color: "#856404",
      textAlign: "center",
    },
  });
