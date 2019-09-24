import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { LoadingScreen } from '../../commons';
import styles from './styles/ChatScreen';
import Colors from '../../../constants/Colors';
import { Controler } from './controlers/ChatScreen';

const controler = new Controler();

export default class ImagePickerExample extends React.Component {
  static navigationOptions = {
    title: 'Chat',
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  };

  state = {
    message: '',
    friendId: 'default',
    allMessages: [],
    friendName: 'default,',
    refreshCounter: 0,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    await this.setState({
      friendId: this.props.navigation.state.params.friendId,

    });
    const response = await controler.getAllMessages(this);
    await this.setState({ allMessages: response.allMessages, friendName: response.friendName });
    this.setState({ loading: false });
    setTimeout(() => {
      controler.scrollToEnd(this);
    }, 50);
  }

  async componentWillReceiveProps() {
    const response = await controler.getAllMessages(this);
    await this.setState({ allMessages: response.allMessages, friendName: response.friendName });
    this.setState({ loading: false });
    setTimeout(() => {
      controler.scrollToEnd(this);
    }, 50);
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior="padding" enabled keyboardVerticalOffset={80}
      >
        <View style={styles.root}>
          <View style={styles.messagesList}>
            <View style={styles.root}>
              <View style={styles.contentContainer}>
                <ScrollView ref={(scrollView) => { this.scrollView = scrollView; }} vertical>
                  {this.state.allMessages.map((message) => (
                    message.sendBy === 'You' ?
                      (<View key={message._id} style={styles.myMessageCard}>
                        <Text style={styles.message}>
                          {message.content}
                        </Text>
                      </View>)
                      :
                      (<View key={message._id} style={styles.friendMessageCard}>
                        <Text style={styles.message}>
                          {message.content}
                        </Text>
                      </View>)
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={styles.underListBox}>
            <TextInput
              style={styles.inputMessage}
              onChangeText={(text) => this.setState({ message: text })}
              placeholder="Aa"
              ref={input => { this.textInput = input; }}
              onTouchStart={() => setTimeout(async () => {
                controler.scrollToEnd(this);
                await controler.getRawPostResponse(this, 'markChatIsSeenTrue');
              }, 200)}
            />
            <TouchableOpacity style={styles.buttonSend} onPress={() => controler.sendMessage(this)}>
              <Text style={styles.buttonText}> Send </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

    );
  }
}
