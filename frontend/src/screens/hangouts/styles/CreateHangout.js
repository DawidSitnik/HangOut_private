import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    marginTop: 5,
    fontSize: 20,
    fontFamily: 'montserratBold',
  },

  dateFromBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    right: 10,
  },
  dateToBox: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    flexDirection: 'column',

  },

  timeFromDescription: {
    fontSize: 16,
    fontFamily: 'montserratMed',
    left: 12,
  },

  timeToDescription: {
    fontSize: 16,
    fontFamily: 'montserratMed',
    left: 8,
  },

  input: {
    textAlign: 'center',
    marginTop: 0,
    borderBottomColor: Colors.basicDetail,
    borderBottomWidth: 1,
    width: 200,
  },

  chooseLocationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.basicDetail,
    margin: 5,
    padding: 5,
    borderRadius: 20,
    width: 100,
  },

  buttonText: {
    color: Colors.basicText,
    fontSize: 14,
    fontFamily: 'montserratMed',
  },

  date: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  warning: {
    color: Colors.basicDetail,
    fontFamily: 'montserratMed',
    fontSize: 14,
  },

});

export default styles;
