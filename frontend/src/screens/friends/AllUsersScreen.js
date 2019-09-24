import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { HangoutsApi } from '../../../network/api';
import { LoadingScreen } from '../../commons';
import styles from './styles/AllUsersScreen';
import stylesList from './styles/AllUsersList';
import Colors from '../../../constants/Colors';
import globals from '../../../assets/globals';

const hangoutsApi = new HangoutsApi();

class AllUsersScreen extends Component {
  static navigationOptions = {
    title: 'All Users',
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
    refresh: 0,
    loading: false,
    allUsers: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const allUsers = await this.props.hangoutsApi.getAllUsersExceptOne(globals.id);
    this.setState({ loading: false, allUsers });
  }

  AllUsersList = ({ allUsers }) => (
    <View style={stylesList.root}>
      <View style={stylesList.contentContainer}>
        <ScrollView vertical>
          {allUsers.map((user) => (
            <TouchableOpacity key={user._id} onPress={() => this.openUserProfile(user)}>
              <View key={user._id} style={stylesList.userCard}>
                <Text style={stylesList.userName}>
                  {user.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  async refresh() {
    await this.props.navigation.state.params.refresh();
  }

  openUserProfile = (user) => {
    this.props.navigation.navigate('UserProfile', { userId: user._id, refresh: this.refresh.bind(this) });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (

      <View style={styles.root}>
        <this.AllUsersList allUsers={this.state.allUsers} />
      </View>
    );
  }
}

export default AllUsersScreen;
