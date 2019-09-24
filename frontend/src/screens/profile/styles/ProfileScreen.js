import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 128,
    width: 128,
    borderRadius: 64,
    marginTop: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'montserrat',
  },

  description: {
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    fontFamily: 'montserratLight',
  },

});

export default styles;
