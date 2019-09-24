import MapView, { Marker, Circle } from 'react-native-maps';
import React from 'react';
import { View, Text } from 'react-native';
import { LoadingScreen } from '../../commons';
import styles from './styles/HangoutCardLocation';
import Colors from '../../../constants/Colors';

export default class HangoutCardLocation extends React.Component {
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
      radius: this.props.navigation.state.params.radius,
      hangoutLatitude: this.props.navigation.state.params.hangoutLatitude,
      hangoutLongitude: this.props.navigation.state.params.hangoutLongitude,
    };
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.root}>
        <Text style={styles.title}>Location</Text>
        <MapView
          showsUserLocation
          loadingEnabled
          style={{ alignSelf: 'stretch', flex: 1 }}
          initialRegion={{
            latitude: this.state.hangoutLatitude,
            longitude: this.state.hangoutLongitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
        >

          <Marker
            key={this.state.hangoutLatitude}
            coordinate={{ latitude: this.state.hangoutLatitude, longitude: this.state.hangoutLongitude }}
          />

          <Circle
            key={this.state.hangoutLongitude}
            center={{
              latitude: this.state.hangoutLatitude,
              longitude: this.state.hangoutLongitude,
            }}
            radius={parseFloat(this.state.radius)}
            strokeWidth={1}
            strokeColor={Colors.basicDetail}
            fillColor={'rgba(230,238,255,0.5)'}
          />

        </MapView>

      </View>
    );
  }
}
