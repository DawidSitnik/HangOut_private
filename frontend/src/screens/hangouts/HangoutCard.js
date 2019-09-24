import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LoadingScreen } from '../../commons';
import styles from './styles/HangoutCard';
import Colors from '../../../constants/Colors';
import globalStyles from '../../../constants/Styles';
import { Controler } from './controlers/HangoutCard';

const controler = new Controler();

export default class HangoutCard extends React.Component {
  static navigationOptions = {
    title: 'Hangout Card',
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
      hangoutId: this.props.navigation.state.params.hangoutId,
      distance: this.props.navigation.state.params.distance,
      hangoutType: this.props.navigation.state.params.hangoutType,
      loading: false,
      activity: 'default',
      timeFrom: now,
      timeTo: now,
      maxPeople: 0,
      creatorId: 'default',
      description: 'default',
      buttonText: 'default',
      latitude: 'default',
      longitude: 'default',
      radius: 0,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await controler.loadStates(this, this.state.hangoutId);
    controler.checkHangoutType(this, this.state.hangoutType);
    this.setState({ loading: false });
  }

  onPressFunction = async () => {
    await controler.buttonOnPress(this, this.state.hangoutType);
    this.props.navigation.navigate('Home');
  };

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.root}>

        <Text style={styles.title}> Activity </Text>
        <Text style={styles.fetchedActivity}> {this.state.activity} </Text>

        <Text style={styles.title}> Description </Text>
        <Text style={styles.fetchedDescription}> {this.state.description} </Text>

        <Text style={styles.title}> Location </Text>
        <TouchableOpacity
          style={styles.button} onPress={() => this.props.navigation.navigate('HangoutCardLocation',
            { hangoutLatitude: this.state.latitude, hangoutLongitude: this.state.longitude, radius: this.state.radius })}
        >
          <Text style={styles.buttonText} > See </Text>
        </TouchableOpacity>

        <Text style={styles.title}> Available time </Text>

        <View style={styles.time} >
          <View style={styles.timeFrom} >
            <Text style={styles.subtitleTimeFrom}> from </Text>
            <Text style={styles.fetchedtime}> {this.state.timeFrom} </Text>
          </View>
          <View style={styles.timeTo} >
            <Text style={styles.subtitleTimeTo}> to </Text>
            <Text style={styles.fetchedtime}> {this.state.timeTo} </Text>
          </View>
        </View>

        <Text style={styles.title}> Distance </Text>
        <Text style={styles.fetchedDistance}> {this.state.distance} km </Text>

        <Text style={styles.title}> People </Text>
        <TouchableOpacity
          style={styles.button} onPress={() => this.props.navigation.navigate('PeopleInHangout',
            { hangoutId: this.state.hangoutId })}
        >
          <Text style={styles.buttonText} > See </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={globalStyles.basicButton} onPress={async () => this.onPressFunction()}
        >
          <Text style={globalStyles.basicButtonText} > {this.state.buttonText} </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
