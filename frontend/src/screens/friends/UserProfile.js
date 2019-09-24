import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { LoadingScreen } from '../../commons';
import styles from './styles/UserProfile';
import Colors from '../../../constants/Colors';
import globalStyles from '../../../constants/Styles';
import globals from '../../../assets/globals';
import { Controler } from './controlers/UserProfile';

const controler = new Controler();

export default class ImagePickerExample extends React.Component {
  static navigationOptions = {
    title: 'Profile',
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
      myId: globals.id,
      userId: 'default',
      name: 'default',
      description: 'default',
      friendButton: 'Add Friend',
      baseUrl: globals.serverAddress,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.setState({ userId: this.props.navigation.state.params.userId });
    await controler.setNameAndDescription(this);
    if (!await controler.checkIfFriend(this)) {
      await controler.checkIfRequestSend(this);
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.root}>
        <Image
          source={{
            uri: globals.serverAddress + "photos/download/" + new Date().getTime() + "/" + this.state.userId + "/",
            cache: 'reload',
            method: 'post',
            headers: {
              Pragma: 'no-cache',
            },
          }}
          style={styles.image}
        />
        <Text style={styles.name}> {this.state.name} </Text>
        <Text style={styles.description} > { this.state.description } </Text>
        <TouchableOpacity style={globalStyles.basicButton} onPress={() => controler.handleFriendship(this)}>
          <Text style={globalStyles.basicButtonText} > {this.state.friendButton} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
