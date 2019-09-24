import { Alert } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import globals from '../../../../assets/globals';

class Controler {
  async addNotificationsToken(id) {
    // creating new notification token for user
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();

    // sending to the server
    await fetch(`${globals.serverAddress}users/addNotificationsToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id, token }),
    });
  }

  async getHangoutsAroundUser() {
    const data = await fetch(`${globals.serverAddress}hangouts/${globals.id}/getHangoutsAroundUser`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const response = await data.json();
    return response.hangoutsAroundUser;
  }

  async sendCoordinates(id, latitude, longitude) {
    await fetch(`${globals.serverAddress}users/sendCoordinates`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, longitude, latitude }),
    });
  }

  findCoordinates = (_this) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.sendCoordinates(globals.id, position.coords.latitude, position.coords.longitude);
        _this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
}

export { Controler };
