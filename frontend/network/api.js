import globals from '../assets/globals';

class HangoutsApi {
  async sendNotification(userId, message, type, myId) {
    await fetch(`${globals.serverAddress}users/sendNotification`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, message, type, fromId: myId }),
    });
  }

  async getAllUsers() {
    const data = await fetch(`${globals.serverAddress}users/getAll`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const response = await data.json();
    return response.user;
  }

  async getAllUsersExceptOne(id) {
    const data = await fetch(`${globals.serverAddress}users/getAllUsersExceptOne`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ myId: id }),
    });
    const response = await data.json();
    return response.user;
  }

  async getMyFriends() {
    const data = await fetch(`${globals.serverAddress}users/getMyFriends`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ myId: globals.id }),
    });

    const response = await data.json();
    return response.friends;
  }

  async getFirstMessages() {
    const chats = await fetch(`${globals.serverAddress}users/${globals.id}/getFirstMessages`);

    const response = await chats.json();

    return response.chats;
  }
}

export { HangoutsApi };
