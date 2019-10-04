import { Platform } from 'react-native';

const globals = {};

globals.token = 'null';
globals.isDevVersion = 0;
globals.serverAddress = 'http://192.168.1.211:3000/api/';
// globals.serverAddress = 'http://ec2-18-222-141-95.us-east-2.compute.amazonaws.com:3000/api/';
if (Platform.OS === 'ios') globals.serverAddress = 'http://192.168.1.211:3000/api/';

// if (Platform.OS === 'ios') globals.serverAddress = 'http://ec2-18-222-141-95.us-east-2.compute.amazonaws.com:3000/api/';
globals.id = 'null'; 
globals.defaultProfilePicture = 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png';
export default globals;
