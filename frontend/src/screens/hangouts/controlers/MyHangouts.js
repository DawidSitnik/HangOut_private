import globals from '../../../../assets/globals';

class Controler {
  async findCreatedHangouts(_this) {
    const data = await fetch(`${globals.serverAddress}hangouts/${globals.id}/findCreatedHangouts`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const createdHangouts = await data.json();
    _this.setState({ createdHangouts: createdHangouts.hangouts });
  }
  async findJoinedHangouts(_this) {
    const data = await fetch(`${globals.serverAddress}hangouts/${globals.id}/findJoinedHangouts`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const joinedHangouts = await data.json();
    _this.setState({ joinedHangouts: joinedHangouts.hangouts });
  }
}

export { Controler };
