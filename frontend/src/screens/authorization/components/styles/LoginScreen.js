import { StyleSheet } from 'react-native';
import Colors from '../../../../../constants/Colors';

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: Colors.basicInput,
    borderColor: Colors.basicDetail,
    margin: 10,
    padding: 8,
    color: Colors.basicTextDark,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 18,
    fontFamily: 'montserrat',
  },

  errorText: {
    color: Colors.basicTextDark,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '900',
  },
  container: {
    backgroundColor: Colors.basicBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default styles;
