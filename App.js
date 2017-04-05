import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import ArcView from './src/ArcView';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => (
  <View style={styles.container}>
    <ArcView />
  </View>
);

export default App;
