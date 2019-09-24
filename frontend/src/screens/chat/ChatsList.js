import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { HangoutsApi } from '../../../network/api';
import { LoadingScreen } from '../../commons';
import styles from './styles/ChatsList';
import Colors from '../../../constants/Colors';
import globals from './../../../assets/globals';

const hangoutsApi = new HangoutsApi();

class AllUsersScreen extends Component {
  static navigationOptions = {
    title: 'Your Chats',
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  };

static defaultProps = {
  hangoutsApi,
};

  state = {
    loading: false,
    chats: [],
  };

  async componentDidMount() {
    this.props.navigation.addListener('willFocus', async () => {
      const chats = await this.props.hangoutsApi.getFirstMessages();
      this.setState({ chats });
    });
    this.setState({ loading: true });
    const chats = await this.props.hangoutsApi.getFirstMessages();
    this.setState({ loading: false, chats });
  }

  ChatsList = ({ Chats }) => (
    <View style={styles.rootList}>
      <View style={styles.contentContainer}>
        <ScrollView vertical>
          {Chats.map((chat) => (
            <TouchableOpacity key={chat._id} onPress={() => this.openUserProfile(chat)}>
              <View key={chat._id} style={styles.userCard}>
                <Image
                  source={{
                    uri: globals.serverAddress + "photos/download/" + new Date().getMinutes() + "/" + chat._id + "/",
                    cache: 'reload',
                    method: 'post',
                    headers: {
                      Pragma: 'no-cache',
                    },
                  }}
                  style={styles.image}
                />
                <View style={styles.nameAndMessageCard}>
                  <Text style={styles.friendName}>
                    {chat.friendName}
                  </Text>
                  <Text style={styles.firstMessage}>
                    {`${chat.firstMessage.sendBy}: ${chat.firstMessage.content}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  openUserProfile = (user) => {
    this.props.navigation.navigate('ChatScreen', { friendId: user._id });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (

      <View style={styles.root}>
        <this.ChatsList Chats={this.state.chats} />
      </View>
    );
  }
}

export default AllUsersScreen;
