import globals from '../../../../assets/globals';
import { AsyncStorageApi } from '../../../../assets/asyncStorageApi';
import { MyImagePicker } from '../components';

const asyncStorageApi = new AsyncStorageApi();

class Controller {
  async deleteOldHangouts() {
    await fetch(`${globals.serverAddress}hangouts/deleteOldHangouts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  }
  onSubmitChangeDescriptionInput = async (_this) => {
    await fetch(`${_this.state.baseUrl}users/changeDescription`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: _this.state.id, description: _this.state.description }),
    });
  }

  setNameAndDescription = async (_this) => {
    let user = await fetch(`${_this.state.baseUrl}users/${_this.state.id}/getUser`)
      .then(resp => resp.json())
      .then(json => user = json.user)
      .catch(err => console.log(err));
    _this.setState({ name: user.name, description: user.description });
  };

  logOut = async (_this) => {
    globals.id = 'null';
    globals.token = 'null';
    await asyncStorageApi.deleteGlobals();
    _this.props.navigation.navigate('Start');
  };

  uploadPic = async (_this) => {
    const myImagePicker = new MyImagePicker();
    const image = await myImagePicker.pickImage();
    _this.setState({shouldBeLoaded:  _this.state.shouldBeLoaded*(-1) })
  };

  // downloadPhoto = async (_this) => {
  //   return fetch(`${globals.serverAddress}photos/download`, {
  //     method: 'post',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: globals.id,
  //     }),
  //   }).then((response) => {
  //
  //     print(response)
  //
  //     return response._bodyText;
  //   })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
}

export { Controller };
