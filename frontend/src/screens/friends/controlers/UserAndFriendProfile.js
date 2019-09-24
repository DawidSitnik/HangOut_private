import globals from '../../../../assets/globals';
import { HangoutsApi } from '../../../../network/api';

const hangoutsApi = new HangoutsApi();

class UserAndFriendProfile {
  getRawPostResponse = async (route, friendId) => await fetch(`${globals.serverAddress}users/${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ myId: globals.id, friendId }),
  })

  requestFriend = async (_this, friendId) => {
    this.getRawPostResponse('requestFriend', friendId);
    _this.setState({ friendButton: 'Cancel Request' });
    await hangoutsApi.sendNotification(friendId, 'You got a new friend request!', 'friendRequest', globals.id);
  }

  cancelRequests = async (_this, friendId) => {
    this.getRawPostResponse('cancelRequest', friendId);
    _this.setState({ friendButton: 'Add Friend' });
  }

  addFriend = async (_this, friendId) => {
    this.getRawPostResponse('addFriend', friendId);
    await this.cancelRequests(_this, friendId);
    _this.setState({ friendButton: 'Delete Friend' });
    await _this.props.navigation.state.params.refresh();
    await hangoutsApi.sendNotification(friendId, 'Your friend request was accepted!', 'friendAccepted', globals.id);
  }

  deleteFriend = async (_this, friendId) => {
    this.getRawPostResponse('deleteFriend', friendId);
    await _this.props.navigation.state.params.refresh();
    _this.setState({ friendButton: 'Add Friend' });
  }

  async handleFriendship(_this, friendButton, friendId) {
    if (friendButton === 'Cancel Request') this.cancelRequests(_this, friendId);
    if (friendButton === 'Accept Request') this.addFriend(_this, friendId);
    if (friendButton === 'Add Friend') this.requestFriend(_this, friendId);
    if (friendButton === 'Delete Friend') this.deleteFriend(_this, friendId);
  }
}

export { UserAndFriendProfile };
