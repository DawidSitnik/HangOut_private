import React, { Component } from 'react';
import { Notifications } from 'expo';
import { View, Text, TouchableOpacity } from 'react-native';
import { LoadingScreen } from '../../commons';
import { MyHangoutsList } from './components';
import styles from './styles/HomeScreen';
import Colors from '../../../constants/Colors';
import globalStyles from '../../../constants/Styles';
import globals from '../../../assets/globals';
import { AsyncStorageApi } from '../../../assets/asyncStorageApi';
import { Controler } from './controlers/HomeScreen';

const asyncStorageApi = new AsyncStorageApi();
const controler = new Controler();

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  };

  state = {
    _isMounted: false,
    loading: false,
    location: 'null',
    hangouts: [],
    notification: {},
    latitude: 0,
    longitude: 0,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.state._isMounted = true;
    const hangouts = await controler.getHangoutsAroundUser();
    await controler.addNotificationsToken(globals.id);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    this.setState({ loading: false, hangouts });
    await controler.findCoordinates(this);
    asyncStorageApi.saveGlobals();
  }

  componentWillUnmount() {
    this.state._isMounted = false;
  }

  _handleNotification = async (notification) => {
    if (this.state._isMounted) {
      this.setState({ notification });
      if (notification.data.type === 'friendRequest') {
        this.props.navigation.navigate('UserProfile', { userId: notification.data.fromId });
      }
      if (notification.data.type === 'messageReceived') {
        this.props.navigation.navigate('UserProfile', { userId: notification.data.fromId });
      }
      if (notification.data.type === 'newMessage') {
        this.props.navigation.navigate('ChatScreen', { friendId: notification.data.fromId });
      }
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={globalStyles.basicButton} onPress={() => this.props.navigation.navigate('CreateHangout',
              { latitude: this.state.latitude, longitude: this.state.longitude })}
          >
            <Text style={globalStyles.basicButtonText} > Create Hangout </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.basicButton} onPress={() => this.props.navigation
              .navigate('FindOnTheMap', { latitude: this.state.latitude, longitude: this.state.longitude })}
          >
            <Text style={globalStyles.basicButtonText}>Find Hangout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.basicButton} onPress={() => this.props.navigation.navigate('MyHangouts')}
          >
            <Text style={globalStyles.basicButtonText}>My Hangouts</Text>
          </TouchableOpacity>
        </View >
        <View style={styles.hangouts}>
          <MyHangoutsList hangouts={this.state.hangouts} _this={this} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
