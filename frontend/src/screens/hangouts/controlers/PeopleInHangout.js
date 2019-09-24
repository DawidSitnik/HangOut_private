import globals from '../../../../assets/globals';

class Controler {
  async getPeopleInHangout(_this) {
    const data = await fetch(`${globals.serverAddress}hangouts/${_this.state.hangoutId}/${globals.id}/getPeopleInHangout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const peopleInHangout = await data.json();
    return peopleInHangout;
  }
}

export { Controler };
