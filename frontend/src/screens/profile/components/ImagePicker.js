import * as ImagePicker from 'expo-image-picker';
import globals from '../../../../assets/globals';

class MyImagePicker {
  constructor() {
    this.imageUri = 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png';
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
    });

    if (!result.cancelled) {
      this.imageUri = result.uri;
    } else {
      console.log('problem with image uri');
      return this.imageUri;
    }

    this.postImage(this.imageUri);

    return this.imageUri;
  };


  postImage = (image) => {
    const photo = {
      uri: image,
      name: globals.id,
      type: 'image/jpeg',
    };
    const data = new FormData();
    data.append('file', photo);
    const config = {
      method: 'POST',
      body: data,
      name: globals.id,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return fetch(globals.serverAddress + "photos/upload", config);
  }
}

export default MyImagePicker;
