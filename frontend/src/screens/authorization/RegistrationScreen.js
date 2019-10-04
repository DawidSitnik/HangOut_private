import React, { Component } from 'react';
import { View, Text, AppRegistry, TouchableOpacity, TextInput } from 'react-native';
import globals from '../../../assets/globals';
import globalStyles from '../../../constants/Styles';
import { Controller } from './components/controller';
import { LoadingScreen } from '../../commons';
import styles from './components/styles/RegistrationScreen';
import Colors from '../../../constants/Colors';

const controller = new Controller();

class RegistrationScreen extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  };

  state = {
    isMounted: false,
    username: 'null',
    password: 'null',
    email: 'null',
    errorMessage: '',
  }

  async componentDidMount() {
    this.setState({ isMounted: true });
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  }

  signUp = async () => {
    try {
      let response = await controller.register(this.state.username, this.state.email, this.state.password);

      response = JSON.parse(response);
      this.setState({ errorMessage: response.message });
      if (globals.id !== 'null') {
        console.log(globals);
        this.props.navigation.navigate('Home'); }
    } catch (err) {
      console.log('error when signing up: ', err);
    }
  }

  render() {
    if (!this.state.isMounted) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor='black'
          onChangeText={val => this.onChangeText('password', val)}
        />

        <Text>
          {this.state.errorMessage}
        </Text>
        <TouchableOpacity
          style={globalStyles.basicButton}
          onPress={this.signUp}
        >
          <Text style={globalStyles.basicButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => RegistrationScreen);
export default RegistrationScreen;
