import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles/FoundHangoutsList';

const FoundHangoutsList = ({ _this, foundHangouts }) => (
  <View style={styles.root}>
    <View style={styles.contentContainer}>
      <ScrollView vertical>
        {foundHangouts.map((hangout) => (
          <TouchableOpacity key={hangout.hangout._id} onPress={() => _this.openHangout(hangout, 'found')}>
            <View key={hangout.hangout._id} style={styles.hangoutCard}>
              <Text style={styles.activity}>
                {hangout.hangout.activity}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </View>
);

export default FoundHangoutsList;
