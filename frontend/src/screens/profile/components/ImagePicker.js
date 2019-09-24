import * as ImagePicker from 'expo-image-picker';
import globals from '../../../../assets/globals';

class MyImagePicker {
  constructor() {
    this.imageUri = 'https://www.google.com/search?q=default+profile+picture&safe=strict&client=ubuntu&hs=YFS&channel=fs&sxsrf=ACYBGNTtlArs5nFjYaaCFKlMJuS-HAd-pQ:1569327285935&tbm=isch&source=iu&ictx=1&fir=3RcKrLzGB_RtiM%253A%252Cj34Q5H2ECAfrGM%252C_&vet=1&usg=AI4_-kSpC3gaGIPmXoLsXgF3kzPUB_ruIw&sa=X&ved=2ahUKEwjD5Kfbt-nkAhUhlYsKHe7DAn8Q9QEwA3oECAYQCg#imgrc=3RcKrLzGB_RtiM:';
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
