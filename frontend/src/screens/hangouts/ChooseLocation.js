import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LoadingScreen } from '../../commons';
import styles from './styles/ChooseLocation';
import Colors from '../../../constants/Colors';
import globalStyles from '../../../constants/Styles';

export default class ChooseLocation extends React.Component {
  static navigationOptions = {
    title: 'Choose Location',
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
      howFar: 0,
      warning: '',
      latitude: 1000,
      longitude: 1000,
    };
    this.handlePress = this.handlePress.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }),
      (error) => console.log('Error:', error)
    );
    this.setState({ loading: false });
  }

  async handlePress(e) {
    await this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
        },
      ],
    });
  }

  render() {
    if (this.state.loading || (this.state.latitude === 1000 && this.state.longitude === 1000)) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.root}>
        <Text style={styles.title}> Choose location for your hangout</Text>
        <MapView
          showsUserLocation
          loadingEnabled
          style={{ alignSelf: 'stretch', flex: 0.9 }}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={this.handlePress}
        >
          {this.state.markers.map((marker) => <Marker key={marker.coordinate} {... marker} />)}

        </MapView>

        <TouchableOpacity
          style={globalStyles.basicButton} onPress={() => {
            this.props.navigation.state.params.returnData(this.state.markers[0].coordinate.latitude, this.state.markers[0].coordinate.longitude);
            this.props.navigation.goBack();
          }
          }
        >
          <Text style={globalStyles.basicButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
