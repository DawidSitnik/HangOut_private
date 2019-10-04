import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { LoadingScreen } from '../../commons';
import styles from './styles/FriendProfile';
import Colors from '../../../constants/Colors';
import globalStyles from '../../../constants/Styles';
import globals from '../../../assets/globals';
import { Controler } from './controlers/FriendProfile';
import { UserAndFriendProfile } from './controlers/UserAndFriendProfile';

const userAndFriendProfile = new UserAndFriendProfile();
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
      image: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png',
      friendId: 'default',
      name: 'default',
      description: 'default',
      friendButton: 'Add Friend',
    };
    this.handleFriendship = this.handleFriendship.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.setState({ friendId: this.props.navigation.state.params.userId });
    if (!await controler.checkIfFriend(this)) { await controler.checkIfRequestSend(this); }
    this.setState({ loading: false });
  }

  async handleFriendship() {
    await userAndFriendProfile.handleFriendship(this, this.state.friendButton, this.state.friendId);
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    const { image } = this.state;

    return (
      <View style={styles.root}>
        <Image
          source={{
            //uri: globals.serverAddress + "photos/download/" + new Date().getTime() + "/" + this.props.navigation.state.params.userId + "/",
            uri: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png',
            cache: 'reload',
            method: 'post',
            headers: {
              Pragma: 'no-cache',
            },
          }}
          style={styles.image}
        />
        <Text style={styles.name}> {this.props.navigation.state.params.name} </Text>
        <Text style={styles.description} > { this.props.navigation.state.params.description } </Text>
        <TouchableOpacity
          style={globalStyles.basicButton} onPress={() => this.props.navigation.navigate('ChatScreen',
            { friendId: this.state.friendId, myId: globals.id, baseUrl: globals.serverAddress })}
        >
          <Text style={globalStyles.basicButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.basicButton} onPress={this.handleFriendship}>
          <Text style={globalStyles.basicButtonText} > {this.state.friendButton} </Text>
        </TouchableOpacity>

      </View>
    );
  }
}
