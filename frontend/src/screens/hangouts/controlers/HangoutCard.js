import { StackActions } from 'react-navigation'; 
import globals from '../../../../assets/globals';
import { HangoutsApi } from '../../../../network/api';

const hangoutsApi = new HangoutsApi();

class Controler {
  async loadStates(_this, hangoutId) {
    const data = await fetch(`${globals.serverAddress}hangouts/${hangoutId}/getHangout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const response = await data.json();
    _this.setState({
      activity: response.hangout.activity,
      timeFrom: response.hangout.timeFrom,
      timeTo: response.hangout.timeTo,
      maxPeople: response.hangout.maxPeople,
      creatorId: response.hangout.creator.id,
      description: response.hangout.description,
      latitude: response.hangout.coordinates.latitude,
      longitude: response.hangout.coordinates.longitude,
      radius: response.hangout.radius,
      hangoutId: response.hangout._id,
    });
  }

  checkHangoutType(_this, hangoutType) {
    if (hangoutType === 'found') _this.setState({ buttonText: 'Join Hangout' });
    if (hangoutType === 'joined') _this.setState({ buttonText: 'Leave Hangout' });
    if (hangoutType === 'created') _this.setState({ buttonText: 'Delete Hangout' });
  }

  async buttonOnPress(_this, hangoutType) {
    if (hangoutType === 'found') {
      await this.onPressAction(_this, 'join');
      const popAction = StackActions.pop({ n: 1 });
      _this.props.navigation.dispatch(popAction);
    }
    if (hangoutType === 'joined') {
      await this.onPressAction(_this, 'leave');
      const popAction = StackActions.pop({ n: 1 });
      _this.props.navigation.dispatch(popAction);
    }
    if (hangoutType === 'created') {
      await this.onPressAction(_this, 'delete');
      const popAction = StackActions.pop({ n: 1 });
      _this.props.navigation.dispatch(popAction);
    }
  }

  async onPressAction(_this, action) {
    await fetch(`${globals.serverAddress}hangouts/${action}Hangout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: globals.id, hangoutId: _this.state.hangoutId }),
    });
    await this.sendNotification(_this, action);
  }

  async sendNotification(_this, hangoutType) {
    if (hangoutType === 'join') { await hangoutsApi.sendNotification(_this.state.creatorId, 'Someone joined your hangout!', 'joinHangout', globals.id); }
    if (hangoutType === 'leave') { await hangoutsApi.sendNotification(_this.state.creatorId, 'Someone left your hangout!', 'leaveHangout', globals.id); }
    // to trzeba zmienic tak zeby informowalo wszystkich ktorzy byli w hangoucie
    if (hangoutType === 'delete') { await hangoutsApi.sendNotification(_this.state.creatorId, 'Hangout was deleted!', 'deleteHangout', globals.id); }
  }
}

export { Controler };
