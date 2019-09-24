import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps'
import styles from './styles/FindHangout';
import Colors from '../../../constants/Colors';

export default class FindHangoutOnMap extends React.Component {
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

  onPressFunction = async () => {
    if (this.state.howFar === 0) {
      this.setState({ warning: 'put the distance first' });
      return;
    }
    this.setState({ warning: '' });
    this.props.navigation.navigate('FoundHangoutsList', { howFar: this.state.howFar });
  };

  render() {
    return (
      <View style={styles.root}>
        <MapView
          style={{ flex: 1}}
          region={{
            latitude: 42.882004,
            longitude: 74.582748,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        />
      </View>
    );
  }
}
