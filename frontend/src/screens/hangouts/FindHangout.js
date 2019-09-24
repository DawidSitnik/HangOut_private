import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles/FindHangout';
import Colors from '../../../constants/Colors';
import globalStyles from '../../../constants/Styles';

export default class FindHangout extends React.Component {
  static navigationOptions = {
    title: 'Find Hangout',
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
      howFar: 0,
      warning: '',
    };
  }

  onPressFunctionList = async () => {
    if (this.state.howFar === 0) {
      this.setState({ warning: 'put the distance first' });
      return;
    }
    this.setState({ warning: '' });
    this.props.navigation.navigate('FoundHangoutsList', { howFar: this.state.howFar });
  };

  onPressFunctionMap = async () => {
    if (this.state.howFar === 0) {
      this.setState({ warning: 'put the distance first' });
      return;
    }
    this.setState({ warning: '' });
    this.props.navigation.navigate('FindOnTheMap', { howFar: this.state.howFar, latitude: this.state.latitude, longitude: this.state.longitude });
  };

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.warning}> {this.state.warning} </Text>

        <Text style={styles.title}> How far can you go? </Text>
        <TextInput
          style={styles.input}
          placeholder={'distance in meters'}
          keyboardType="numeric"
          onChangeText={(howFar) => this.setState({ howFar })}
        />

        <TouchableOpacity
          style={globalStyles.basicButton} onPress={async () => this.onPressFunctionList()}
        >
          <Text style={globalStyles.basicButtonText} > Find on the List </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.basicButton} onPress={async () => this.onPressFunctionMap()}
        >
          <Text style={globalStyles.basicButtonText} > Find on the Map </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.basicButton} onPress={async () => this.goToMapScreen()}
        >
          <Text style={globalStyles.basicButtonText} > Find on a map </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
