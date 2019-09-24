import { NavigationActions } from 'react-navigation';
import globals from '../../../../assets/globals';

class Controler {
  checkInputs(_this) {
    if (_this.state.activity === 'default') {
      _this.setState({ warning: 'You need to choose activity' });
      return false;
    }

    if (_this.state.activity.length < 3 || _this.state.description.length > 20) {
      _this.setState({ warning: 'activity should has from 3 to 20 characters' });
      return false;
    }

    if (_this.state.latitude == null || _this.state.longitude == null) {
      _this.setState({ warning: 'set location for your hangout' });
      return false;
    }

    if (_this.state.description.length < 5 || _this.state.description.length > 50) {
      _this.setState({ warning: 'description should has from 5 to 50 characters' });
      return false;
    }

    if (!_this.state.isChangedTimeFrom) {
      _this.setState({ warning: 'You need to choose time from' });
      return false;
    }
    if (!_this.state.isChangedTimeTo) {
      _this.setState({ warning: 'You need to choose time to' });
      return false;
    }
    if (_this.state.radius === 0) {
      _this.setState({ warning: 'You need to choose radius' });
      return false;
    }
    if (_this.state.number < 1 || _this.state.number > 10) {
      _this.setState({ warning: 'Max number of people should be from 1 to 10' });
      return false;
    }
    return true;
  }

  async createHangout(_this) {
    if (this.checkInputs(_this)) {
      const response = await fetch(`${globals.serverAddress}hangouts/createHangout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: globals.id,
          activity: _this.state.activity,
          description: _this.state.description,
          coordinates: {
            longitude: _this.state.longitude,
            latitude: _this.state.latitude,
          },
          timeFrom: _this.state.timeFrom,
          timeTo: _this.state.timeTo,
          radius: _this.state.radius,
          maxPeople: _this.state.number,
        }),
      });
      if (response.error) {
        _this.setState({ warning: 'there was an error while creating your hangout' });
        return;
      }
      _this.setState({ warning: '' });
      _this.props.navigation.dispatch(NavigationActions.back());
    }
  }
}

export { Controler };
