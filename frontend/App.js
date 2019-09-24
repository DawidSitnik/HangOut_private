import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import * as Asset from 'expo-asset'
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  _loadResourcesAsync = async () => {
    // await Asset.loadAsync([
    // ]),
    await Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      montserrat: require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      montserratBold: require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      montserratLight: require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
      montserratMed: require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
    })
  }


  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
