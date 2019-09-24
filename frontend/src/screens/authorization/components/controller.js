import globals from '../../../../assets/globals';

class Controller {
  async register(name, email, password) {
    return fetch(`${globals.serverAddress}users/register`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((response) => {
      return response.json().then((data) => {
        if (data.token) {
          globals.id = data.id;
          globals.token = data.token;
        }
        return JSON.stringify(data)
      });
    })
      .catch((error) => {
        console.error(error);
      });
  }

  async logIn(email, password) {
    return fetch(`${globals.serverAddress}users/logIn`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => {
      return response.json().then((data) => {
        if (data.token) {
          globals.id = data.id;
          globals.token = data.token;
        }
        return JSON.stringify(data)

      });
    })
      .catch((error) => {
        console.error(error);
      });
  }
}

export { Controller };
