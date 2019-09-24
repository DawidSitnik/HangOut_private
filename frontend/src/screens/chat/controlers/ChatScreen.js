import globals from '../../../../assets/globals';
import { HangoutsApi } from '../../../../network/api';

const hangoutsApi = new HangoutsApi();

class Controler {
  getRawPostResponse = async (_this, route) => await fetch(`${globals.serverAddress}users/${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ myId: globals.id, friendId: _this.state.friendId, content: _this.state.message }),
  })

  getAllMessages = async (_this) => {
    const rawResponse = await this.getRawPostResponse(_this, 'getAllMessages');
    const content = await rawResponse.json();
    return content;
  }

  sendMessage = async (_this) => {
    if (_this.state.message === '') return 0;
    await this.getRawPostResponse(_this, 'sendMessage');
    _this.textInput.clear();
    const response = await this.getAllMessages(_this);
    _this.setState({ allMessages: response.allMessages });
    const rawResponse = await this.getRawPostResponse(_this, 'checkIfChatIsSeen');
    const content = await rawResponse.json();
    // only if friend saw our message we are sending him a norification

    if (content.isSeen) {
      await this.getRawPostResponse(_this, 'markChatIsSeenFalse');
      await hangoutsApi.sendNotification(_this.state.friendId, `New message from ${_this.state.friendName}!`, 'newMessage', globals.id);
    }
    setTimeout(() => {
      this.scrollToEnd(_this);
    }, 50);
  }

  scrollToEnd = (_this) => {
    _this.scrollView.scrollToEnd();
  }
}

export { Controler };
