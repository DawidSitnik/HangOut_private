import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles/MyHangoutsList';

const MyhangoutsList = ({ _this, hangouts }) => (
  <View style={styles.root}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Near Me</Text>
    </View>
    <View style={styles.contentContainer}>
      <ScrollView horizontal>
        {hangouts.map((hangout) => (
          <TouchableOpacity
            key={hangout.hangout._id}
            onPress={() => _this.props.navigation
              .navigate('HangoutCard', { hangoutId: hangout.hangout._id, distance: hangout.distance, hangoutType: 'found' })}
          >
            <View key={hangout.hangout._id} style={styles.hangoutCard}>
              <View style={styles.hangoutCardTopContainer}>
                <Text style={styles.hangoutCardTitle}>
                  {hangout.hangout.activity}
                </Text>
              </View>

              <View style={styles.hangoutCardMiddleContainer}>
                <Text style={styles.hangoutCardMaxPeople}>
                max people: {hangout.hangout.maxPeople}
                </Text>
                <Text style={styles.hangoutCardTime}>
                from: {hangout.hangout.timeFrom}
                </Text>
                <Text style={styles.hangoutCardTime}>
                to: {hangout.hangout.timeTo}
                </Text>
              </View>

              <View style={styles.hangoutCardBottomContainer}>
                <Text style={styles.hangoutCardDistance}>
                  distance: {hangout.distance}km
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </View>
);

export default MyhangoutsList;
