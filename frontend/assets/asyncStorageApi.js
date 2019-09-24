import { AsyncStorage } from 'react-native';
import globals from './globals';

class AsyncStorageApi {
   saveGlobals = async () => {
     try {
       await AsyncStorage.setItem('globals', JSON.stringify(globals));
     } catch (error) {
       console.log(error.message);
     }
   };

  loadGlobals = async () => {
    try {
      let loadedGlobals = await AsyncStorage.getItem('globals') || 'none';
      if (loadedGlobals === 'none')
        return;
      loadedGlobals = JSON.parse(loadedGlobals);
      globals.id = loadedGlobals.id;
      globals.token = loadedGlobals.token;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  deleteGlobals = async () => {
    try {
      await AsyncStorage.removeItem('globals');
      return true;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export { AsyncStorageApi };
