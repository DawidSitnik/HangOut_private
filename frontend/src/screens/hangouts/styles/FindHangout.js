import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginTop: 22,
    fontSize: 20,
    fontFamily: 'montserratBold',
  },

  input: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: Colors.basicDetail,
    borderBottomWidth: 1,
    width: 200,
  },

});

export default styles;
