import React, { Component } from 'react';
import { Platform, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { HangoutsApi } from '../../../network/api';
import { LoadingScreen } from '../../commons';
import styles from './styles/FriendsScreen';
import stylesList from './styles/FriendsList';
import Colors from '../../../constants/Colors';
import HeaderIcon from '../../../components/HeaderIcon';
import globals from '../../../assets/globals';

const hangoutsApi = new HangoutsApi();

class friendsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Friends',
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('openAllUsersList')}>
        <HeaderIcon
          name={
            Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search'
          }
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  });

static defaultProps = {
  hangoutsApi,
};
  state = {
    loading: false,
    friends: [],
    reload: 1,
  };

  async componentDidMount() {
    this.props.navigation.addListener('willFocus', async () => {
      this.setState({ reload: this.reload*(-1) });
    });
    this.setState({ loading: true });
    const friends = await this.props.hangoutsApi.getMyFriends();
    this.props.navigation.setParams({ openAllUsersList: this.openAllUsersList });
    this.setState({ friends });
    await this.setState({ loading: false });
  }

  friendsList = ({ friends }) => (
    <View style={stylesList.root}>
      <View style={stylesList.contentContainer}>
        <ScrollView vertical>
          {friends.map((friend) => (
            <TouchableOpacity key={friend.id} onPress={() => this.openUserProfile(friend)}>
              <View key={friend.id} style={stylesList.userCard}>
                <Image
                  source={{
                    //uri: globals.serverAddress + "photos/download/" + new Date().getMinutes() + "/" + friend.id + "/",
                    uri: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png',
                    cache: 'reload',
                    method: 'post',
                    headers: {
                      Pragma: 'no-cache',
                    },
                  }}
                  style={stylesList.image}
                />
                <Text style={stylesList.userName}>
                  {friend.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  async refresh() {
    const friends = await this.props.hangoutsApi.getMyFriends();
    this.setState({ friends });
  }

  openUserProfile = (user) => {
    this.props.navigation.navigate('FriendProfile',
      { name: user.name, description: user.description, userId: user.id, refresh: this.refresh.bind(this) });
  }

  openAllUsersList = () => {
    this.props.navigation.navigate('AllUsersScreen', { refresh: this.refresh.bind(this) });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (

      <View style={styles.root}>
        <this.friendsList friends={this.state.friends} />
      </View>
    );
  }
}

export default friendsScreen;
