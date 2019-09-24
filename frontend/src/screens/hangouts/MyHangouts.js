import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/MyHangouts';
import Colors from '../../../constants/Colors';
import { Controler } from './controlers/MyHangouts';
import { LoadingScreen } from '../../commons';
import CreatedHangoutsList from './components/CreatedHangoutsList';
import JoinedHangoutsList from './components/JoinedHangoutsList';

const controler = new Controler();

export default class myHangouts extends React.Component {
  static navigationOptions = {
    title: 'My Hangouts',
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
      createdHangouts: [],
      joinedHangouts: [],
      distance: 0, // trzeba jakos to zdobycd
    };
  }

  async componentDidMount() {
    // to reload the screen
    this.props.navigation.addListener('willFocus', async () => {
      await controler.findCreatedHangouts(this);
      await controler.findJoinedHangouts(this);
    });
    this.setState({ loading: true });
    await controler.findCreatedHangouts(this);
    await controler.findJoinedHangouts(this);
    this.setState({ loading: false });
  }

  openHangout = (hangout, hangoutType) => {
    this.props.navigation.navigate('HangoutCard', { hangoutId: hangout.hangout._id, distance: hangout.distance, hangoutType });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (

      <View style={styles.root}>
        <Text style={styles.title}> Created Hangouts: </Text>
        <CreatedHangoutsList _this={this} createdHangouts={this.state.createdHangouts} />
        <Text style={styles.title}> Joined Hangouts: </Text>
        <JoinedHangoutsList _this={this} joinedHangouts={this.state.joinedHangouts} />

      </View>
    );
  }
}
