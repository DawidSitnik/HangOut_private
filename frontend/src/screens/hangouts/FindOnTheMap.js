import React from 'react';
import { View, Text, TouchableOpacity, Slider } from 'react-native';
import { LoadingScreen } from '../../commons';
import styles from './styles/FindOnTheMap';
import Colors from '../../../constants/Colors';
import globalStyles from '../../../constants/Styles';
import { Controler } from './controlers/FoundHangoutList';
import MyMapView from './components/MyMapView';

const controler = new Controler();

export default class FindOnTheMap extends React.Component {
  static navigationOptions = {
    title: 'Find on the Map',
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
      markers: [],
      howFar: 1000,
      longitude: this.props.navigation.state.params.longitude,
      latitude: this.props.navigation.state.params.latitude,
      foundHangouts: [],
      clickedMarkerLatitude: 'default',
      clickedMarkerLongitude: 'default',
    };
    this.handlePress = this.handlePress.bind(this);
    this.handlePressMarker = this.handlePressMarker.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }),
      (error) => console.log('Error:', error)
    );
    await controler.findHangouts(this);
    this.setState({ loading: false });
  }

  onPressFunction = async () => {
    if (this.state.howFar === 0) {
      this.setState({ warning: 'put the distance first' });
      return;
    }
    this.setState({ warning: '' });
    this.props.navigation.navigate('FoundHangoutsList', { howFar: this.state.howFar });
  };

  async handlePress() {
    await this.setState({
      clickedMarkerLatitude: 'default',
    });
  }

  async handlePressMarker(e) {
    await this.setState({
      clickedMarkerLatitude: e.nativeEvent.coordinate.latitude,
      clickedMarkerLongitude: e.nativeEvent.coordinate.longitude,
    });
  }

  async findChosenHangout() {
    for (const hangout of this.state.foundHangouts) {
      if (hangout.hangout.coordinates.latitude === this.state.clickedMarkerLatitude
        && hangout.hangout.coordinates.longitude === this.state.clickedMarkerLongitude) {
        return hangout;
      }
    }
  }

  async handleShowDetails() {
    const hangout = await this.findChosenHangout();
    this.props.navigation.navigate('HangoutCard', { hangoutId: hangout.hangout._id, distance: hangout.distance, hangoutType: 'found' });
  }

  async handleSliderChange(value) {
    await this.setState({ howFar: value });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.root}>
        <Text style={styles.title}> How Far Can You Travel:</Text>
        <Slider
          style={{ width: 400 }}
          value={1000}
          onValueChange={value => this.handleSliderChange(value)}
          animateTransitions
          maximumValue={30000}
          minimumValue={1000}
          step={500}
          thumbTintColor={Colors.basicDetail}
          maximumTrackTintColor={Colors.basicDetailDark}
          minimumTrackTintColor={Colors.basicDetail}
        />
        <Text style={styles.howFar}>{this.state.howFar / 1000}km</Text>
        <MyMapView _this={this} />
        <TouchableOpacity
          style={globalStyles.basicButton} onPress={() => this.handleShowDetails()}
        >
          <Text style={globalStyles.basicButtonText}>Show details</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
