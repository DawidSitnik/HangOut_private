import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles/CreatedHangoutsList';

const CreatedHangoutsList = ({ _this, createdHangouts }) => (
  <ScrollView vertical>
    {createdHangouts.map((hangout) => (
      <TouchableOpacity key={hangout.hangout._id} onPress={() => _this.openHangout(hangout, 'created')}>
        <View key={hangout.hangout._id} style={styles.hangoutCard}>
          <Text style={styles.activity}>
            {hangout.hangout.activity}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default CreatedHangoutsList;
