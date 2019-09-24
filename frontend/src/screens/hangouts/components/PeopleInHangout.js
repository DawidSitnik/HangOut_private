import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import React from 'react';
import styles from './styles/PeopleInHangout';
import globals from '../../../../assets/globals';

const PeopleInHangoutList = ({ _this }) => (

  <ScrollView vertical>
    {_this.state.peopleInHangout.map((user) => (
      <TouchableOpacity key={user._id} onPress={() => _this.openUserProfile(user)}>
        <View key={user._id} style={styles.userCard}>
          <Image
            source={{
              uri: globals.serverAddress + "photos/download/" + new Date().getMinutes() + "/" + user._id + "/",
              cache: 'reload',
              method: 'post',
              headers: {
                Pragma: 'no-cache',
              },
            }}
            style={styles.image}
          />
          <Text style={styles.userName}>
            {user.name}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>

);

export default PeopleInHangoutList;
