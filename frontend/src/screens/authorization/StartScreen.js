import React, { Component } from 'react';
import { View, Text, AppRegistry, TouchableOpacity } from 'react-native';
import globals from '../../../assets/globals';
import globalStyles from '../../../constants/Styles';
import { AsyncStorageApi } from '../../../assets/asyncStorageApi';
import { LoadingScreen } from '../../commons';
import styles from './components/styles/StartScreen';
import Colors from '../../../constants/Colors';

const asyncStorageApi = new AsyncStorageApi();

class StartScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  };

  state = { isMounted: false }

  async componentDidMount() {
    await this.setState({ isMounted: true });
    await asyncStorageApi.loadGlobals();
    if (globals.id !== 'null') { this.props.navigation.navigate('Home'); }
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (

      <View style={styles.root}>
        <View style={styles.container}>
          <Text style={styles.text}>Welcome to HangOut!</Text>

          <TouchableOpacity
            style={globalStyles.basicButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={globalStyles.basicButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.basicButton}
            onPress={() => this.props.navigation.navigate('Registration')}
          >
            <Text style={globalStyles.basicButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => StartScreen);
export default StartScreen;
