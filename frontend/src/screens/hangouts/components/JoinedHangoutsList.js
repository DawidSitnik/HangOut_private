import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles/JoinedHangoutsList';

const JoinedHangoutsList = ({ _this, joinedHangouts }) => (

  <ScrollView vertical>
    {joinedHangouts.map((hangout) => (
      <TouchableOpacity key={hangout.hangout._id} onPress={() => _this.openHangout(hangout, 'joined')}>
        <View key={hangout.hangout._id} style={styles.hangoutCard}>
          <Text style={styles.activity}>
            {hangout.hangout.activity}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>

);

export default JoinedHangoutsList;
