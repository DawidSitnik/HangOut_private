import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Controler } from './controlers/CreateHangout';
import DataPicker from './components/DataPickers';
import Colors from '../../../constants/Colors';
import styles from './styles/CreateHangout';
import globalStyles from '../../../constants/Styles';

const dataPicker = new DataPicker();
const controler = new Controler();

class CreateHangout extends Component {
  static navigationOptions = {
    title: 'Create Hangout',
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
    const now = new Date(`${new Date().toString().split('GMT')[0]} UTC`).toISOString().split('.')[0];
    this.state = {
      loading: false,
      activity: 'default',
      description: 'default',
      date: now,
      timeFrom: now,
      timeTo: now,
      number: 0,
      warning: '',
      radius: 0,
      isChangedTimeFrom: false,
      isChangedTimeTo: false,
      longitude: this.props.navigation.state.params.latitude,
      latitude: this.props.navigation.state.params.longitude,
    };
  }

  returnData(latitude, longitude) {
    this.setState({ latitude, longitude });
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.warning}> {this.state.warning} </Text>
        <Text style={styles.title}> Activity </Text>
        <TextInput style={styles.input} placeholderTextColor="white" placeholder={'Choose your activity'} onChangeText={(activity) => this.setState({ activity })} />

        <Text style={styles.title}> Description </Text>
        <TextInput style={styles.input} placeholderTextColor="white" placeholder={'Describe your hangout'} onChangeText={(description) => this.setState({ description })} />

        <Text style={styles.title}> Location </Text>
        <TouchableOpacity
          style={styles.chooseLocationButton} onPress={() => this.props.navigation.navigate('ChooseLocation',
            { latitude: this.state.latitude, longitude: this.state.longitude, returnData: this.returnData.bind(this) })}
        >
          <Text style={styles.buttonText}>Choose</Text>
        </TouchableOpacity>
        <Text style={styles.title}> Radius </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={'How far can you go (meters)'}
          placeholderTextColor="white"
          onChangeText={(radius) => this.setState({ radius })}
        />

        <Text style={styles.title}> Time </Text>

        <View style={styles.date}>
          <View style={styles.dateFromBox}>
            <Text style={styles.timeFromDescription}> From </Text>
            <dataPicker.DataFrom _this={this} />
          </View>
          <View style={styles.dateToBox}>
            <Text style={styles.timeToDescription}> To </Text>
            <dataPicker.DataTo _this={this} />
          </View>
        </View>

        <Text style={styles.title}> Maximum Number of People </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          keyboardType="numeric"
          placeholder={'From 1 to 10'}
          onChangeText={(number) => this.setState({ number })}
        />

        <TouchableOpacity
          style={globalStyles.basicButton} onPress={async () => await controler.createHangout(this)}
        >
          <Text style={globalStyles.basicButtonText}>Create</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default CreateHangout;
