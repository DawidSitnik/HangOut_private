import { Platform } from 'react-native';

const globals = {};

globals.token = 'null';
globals.isDevVersion = 0;
globals.serverAddress = 'http://192.168.1.211:3000/api/';
// globals.serverAddress = 'http://ec2-18-222-141-95.us-east-2.compute.amazonaws.com:3000/api/';
if (Platform.OS === 'ios') globals.serverAddress = 'http://192.168.1.211:3000/api/';

// if (Platform.OS === 'ios') globals.serverAddress = 'http://ec2-18-222-141-95.us-east-2.compute.amazonaws.com:3000/api/';
globals.id = 'null'; 
globals.defaultProfilePicture = 'https://www.google.com/search?q=default+profile+picture&safe=strict&client=ubuntu&hs=YFS&channel=fs&sxsrf=ACYBGNTtlArs5nFjYaaCFKlMJuS-HAd-pQ:1569327285935&tbm=isch&source=iu&ictx=1&fir=3RcKrLzGB_RtiM%253A%252Cj34Q5H2ECAfrGM%252C_&vet=1&usg=AI4_-kSpC3gaGIPmXoLsXgF3kzPUB_ruIw&sa=X&ved=2ahUKEwjD5Kfbt-nkAhUhlYsKHe7DAn8Q9QEwA3oECAYQCg#imgrc=3RcKrLzGB_RtiM:';

export default globals;
