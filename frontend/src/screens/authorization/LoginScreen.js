import React, { Component } from 'react';
import { View, Text, AppRegistry, TextInput, TouchableOpacity } from 'react-native';
import globals from '../../../assets/globals';
import globalStyles from '../../../constants/Styles';
import { Controller } from './components/controller';
import { LoadingScreen } from '../../commons';
import styles from './components/styles/LoginScreen';
import Colors from '../../../constants/Colors';

const controller = new Controller();

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Sign In',
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      password: '',
      email: '',
      errorMessage: '',
    };
    this.signIn = this.signIn.bind(this);
  }

  async componentDidMount() {
    await this.setState({ isMounted: true });
    if (globals.id !== 'null') { this.props.navigation.navigate('Home'); }
  }

  changeText = (key, val) => {
    this.setState({ [key]: val });
  };

  signIn = async () => {
    let response = await controller.logIn(this.state.email, this.state.password);
    response = JSON.parse(response);
    if (globals.id !== 'null') {
      this.props.navigation.navigate('Home');
    } else {
      await this.setState({ errorMessage: response.message });
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='black'
          value={this.state.email}
          onChangeText={val => this.changeText('email', val)}
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor='black'
          value={this.state.password}
          onChangeText={val => this.changeText('password', val)}
        />

        <Text style={styles.errorText}>
          {this.state.errorMessage}
        </Text>
        <TouchableOpacity
          style={globalStyles.basicButton}
          onPress={this.signIn}
        >
          <Text style={globalStyles.basicButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => LoginScreen);
export default LoginScreen;
