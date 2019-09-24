import { StyleSheet } from 'react-native';
import Colors from './Colors';

const globalStyles = StyleSheet.create({

  basicButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.basicDetail,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    width: 200,
  },
  basicButtonText: {
    color: Colors.basicText,
    fontSize: 18,
    fontFamily: 'montserratMed',
  },
});

export default globalStyles;
