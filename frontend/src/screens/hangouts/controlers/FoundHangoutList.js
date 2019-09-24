import globals from '../../../../assets/globals';

class Controler {
  async findHangouts(_this) {
    const data = await fetch(`${globals.serverAddress}hangouts/${globals.id}/${_this.state.howFar}/findHangouts`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const foundHangouts = await data.json();
    _this.setState({ foundHangouts: foundHangouts.hangouts });
  }
}

export { Controler };
