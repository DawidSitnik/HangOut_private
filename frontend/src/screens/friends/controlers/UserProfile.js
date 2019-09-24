import { UserAndFriendProfile } from './UserAndFriendProfile';

const userAndFriendProfile = new UserAndFriendProfile();

class Controler {
  setNameAndDescription = async (_this) => {
    let user = await fetch(`${_this.state.baseUrl}users/${_this.props.navigation.state.params.userId}/getUser`)
      .then(resp => resp.json())
      .then(json => user = json.user)
      .catch(err => console.log(err));
    _this.setState({ name: user.name, description: user.description });
  };

  async handleFriendship(_this) {
    await userAndFriendProfile.handleFriendship(_this, _this.state.friendButton, _this.state.userId);
  }

  checkIfRequestSend = async (_this) => {
    const rawResponse = await userAndFriendProfile.getRawPostResponse('checkIfRequestSend', _this.state.userId);
    const content = await rawResponse.json();

    _this.setState({ friendButton: content.request });
    if (content.request === 'send') _this.setState({ friendButton: 'Cancel Request' });
    if (content.request === 'received') _this.setState({ friendButton: 'Accept Request' });
    if (content.request === 'notRequested') _this.setState({ friendButton: 'Add Friend' });
  }

  checkIfFriend = async (_this) => {
    const rawResponse = await userAndFriendProfile.getRawPostResponse('checkIfFriend', _this.state.userId);
    const content = await rawResponse.json();

    _this.setState({ friendButton: content.request });
    if (content.request === 'friend') {
      _this.setState({ friendButton: 'Delete Friend' });
      return true;
    }
    if (content.request === 'notFriend') _this.setState({ friendButton: 'Add Friend' });
  }
}

export { Controler };
