import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

function DetailsScreen(): React.JSX.Element {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>Écran des détails</Text>
    </View>
  );
}

export default DetailsScreen;
