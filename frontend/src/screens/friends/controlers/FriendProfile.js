import { UserAndFriendProfile } from './UserAndFriendProfile';

const userAndFriendProfile = new UserAndFriendProfile();

class Controler {
  checkIfRequestSend = async (_this) => {
    const rawResponse = await userAndFriendProfile.getRawPostResponse('checkIfRequestSend', _this.state.friendId);
    const content = await rawResponse.json();

    _this.setState({ friendButton: content.request });
    if (content.request === 'send') _this.setState({ friendButton: 'Cancel Request' });
    if (content.request === 'received') _this.setState({ friendButton: 'Accept Request' });
    if (content.request === 'notRequested') _this.setState({ friendButton: 'Add Friend' });
  }

  checkIfFriend = async (_this) => {
    const rawResponse = await userAndFriendProfile.getRawPostResponse('checkIfFriend', _this.state.friendId);
    const content = await rawResponse.json();

    _this.setState({ friendButton: content.request });

    if (content.request === 'friend') {
      _this.setState({ friendButton: 'Delete Friend' });
      return true;
    }
    if (content.request === 'notFriend') _this.setState({ friendButton: 'Add Friend' });

    return false;
  }
}

export { Controler };
