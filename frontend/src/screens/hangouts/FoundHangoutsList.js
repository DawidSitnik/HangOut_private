import React from 'react';
import { View } from 'react-native';
import styles from './styles/FoundHangoutList';
import Colors from '../../../constants/Colors';
import { Controler } from './controlers/FoundHangoutList';
import { LoadingScreen } from '../../commons';
import FoundHangoutsList from './components/FoundHangoutsList';

const controler = new Controler();

export default class FoundHangoutList extends React.Component {
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
    this.state = {
      howFar: this.props.navigation.state.params.howFar,
      distance: 0,
      foundHangouts: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await controler.findHangouts(this);
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
        <FoundHangoutsList _this={this} foundHangouts={this.state.foundHangouts} />
      </View>
    );
  }
}
