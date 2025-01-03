import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
    contentContainer: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      padding: 20,
    },
    text: {
      fontSize: 16,
      color: isDarkMode ? Colors.light : Colors.dark,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: '600',
      color: isDarkMode ? Colors.light : Colors.dark,
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
      color: isDarkMode ? Colors.light : Colors.dark,
      backgroundColor: isDarkMode ? '#222' : '#fff',
    },
    placeholderTextColor: {
      color: isDarkMode ? '#666' : '#999',
    },
    button: {
      backgroundColor: isDarkMode ? '#4a4a4a' : '#e0e0e0',
      padding: 12,
      borderRadius: 8,
      marginTop: 16,
      alignItems: 'center',
    },
    buttonText: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontSize: 16,
      fontWeight: '600',
    },
    validationText: {
      marginTop: 8,
      fontSize: 14,
      textAlign: 'center',
    },
    pickerContainer: {
      marginVertical: 10,
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#222' : '#fff',
      overflow: 'hidden',
    },
    picker: {
      color: isDarkMode ? Colors.light : Colors.dark,
      backgroundColor: 'transparent',
    },
    pickerButton: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 8,
      padding: 12,
      backgroundColor: isDarkMode ? '#222' : '#fff',
      marginVertical: 10,
    },
    pickerButtonText: {
      color: isDarkMode ? Colors.light : Colors.dark,
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#222' : '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: '50%',
    },
    modelItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#444' : '#eee',
    },
    selectedModelItem: {
      backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
    },
    modelItemText: {
      color: isDarkMode ? Colors.light : Colors.dark,
      fontSize: 16,
    },
    selectedModelItemText: {
      fontWeight: '600',
    },
    chatContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
      paddingBottom: 20,
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
      backgroundColor: isDarkMode ? '#333' : '#E9E9EB',
    },
    messageText: {
      fontSize: 16,
    },
    userMessageText: {
      color: '#fff',
    },
    aiMessageText: {
      color: isDarkMode ? '#fff' : '#000',
    },
    chatInputContainer: {
      flexDirection: 'row',
      padding: 8,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333' : '#ccc',
      backgroundColor: isDarkMode ? Colors.black : '#fff',
    },
    chatInput: {
      flex: 1,
      marginRight: 8,
      padding: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 16,
      maxHeight: 100,
      color: isDarkMode ? '#fff' : '#000',
      backgroundColor: isDarkMode ? '#222' : '#fff',
    },
    chatSendButton: {
      backgroundColor: '#007AFF',
      padding: 8,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 80,
    },
    chatSendButtonDisabled: {
      backgroundColor: '#ccc',
    },
    chatSendButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    messagesContainer: {
      padding: 16,
    },
    messageRole: {
      fontSize: 12,
      marginBottom: 4,
      color: isDarkMode ? '#999' : '#666',
    },
    userMessageRole: {
      color: '#fff',
    },
    chatErrorText: {
      color: 'red',
      padding: 8,
      textAlign: 'center',
    },
    safeAreaContainer: {
      flex: 1,
    },
    successText: {
      color: '#2ECC71',
    },
    errorText: {
      color: '#E74C3C',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    warningContainer: {
      backgroundColor: '#FFF3CD',
      padding: 15,
      borderRadius: 8,
      marginBottom: 20,
    },
    warningText: {
      color: '#856404',
      textAlign: 'center',
    },
    primaryButton: {
      backgroundColor: '#007AFF',
      marginTop: 10,
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
    disabledButtonText: {
      color: '#666',
    },
    headerIconContainer: {
      marginRight: 15,
      padding: 5,
    },
    headerIcon: {
      width: 24,
      height: 24,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    modelList: {
      maxHeight: 300,
    },
    closeButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontSize: 16,
    },
    modelSelector: {
      backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
      padding: 12,
      borderRadius: 5,
      marginBottom: 15,
    },
    modelSelectorText: {
      color: isDarkMode ? '#ffffff' : '#000000',
      fontSize: 16,
    },
  });
