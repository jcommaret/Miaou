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
    modelSelector: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      marginVertical: 10,
    },
    modelButton: {
      padding: 8,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ddd',
    },
    selectedModelButton: {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
    },
    modelButtonText: {
      color: isDarkMode ? '#fff' : '#333',
      fontSize: 14,
    },
    selectedModelButtonText: {
      color: '#fff',
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
  });
