import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles/LoadingScreen';

class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoadingScreen;
