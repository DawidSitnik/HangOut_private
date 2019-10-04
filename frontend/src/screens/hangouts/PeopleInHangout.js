import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PeopleInHangoutList from './components/PeopleInHangout';
import { Controler } from './controlers/PeopleInHangout';
import { LoadingScreen } from '../../commons';
import styles from './styles/PeopleInHangout';
import Colors from '../../../constants/Colors';

const controler = new Controler();

class PeopleInHangout extends Component {
  static navigationOptions = {
    title: 'People',
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  };
  state = {
    loading: false,
    hangoutId: this.props.navigation.state.params.hangoutId,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const peopleInHangout = await controler.getPeopleInHangout(this);
    this.setState({ peopleInHangout });
    this.setState({ loading: false, peopleInHangout: peopleInHangout.peopleInHangout });
  }

  openUserProfile = (user) => {
    this.props.navigation.navigate('FriendProfile', { userId: user._id, description: user.description, name: user.name });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.root}>
        {this.state.peopleInHangout !== undefined ?
          <PeopleInHangoutList _this={this} />

          :
          (<Text style={styles.emptyHangoutText}> You are the only person </Text>)}
      </View>
    );
  }
}

export default PeopleInHangout;
