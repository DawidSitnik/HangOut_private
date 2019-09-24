import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'montserratBold',
  },
  subtitleTimeTo: {
    left: 26,
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'montserratMed',
  },
  subtitleTimeFrom: {
    left: 17,
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'montserratMed',
  },
  fetchedActivity: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'montserrat',
  },
  fetchedDescription: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'montserrat',
  },
  fetchedTime: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'montserratLight',
  },
  fetchedDistance: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'montserrat',
  },
  fetchedMaxPeople: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'montserrat',
  },
  time: {
    flexDirection: 'row',
  },
  timeTo: {
    flexDirection: 'column',
    left: 5,
  },
  timeFrom: {
    flexDirection: 'column',
    right: 5,
  },

  buttonText: {
    fontSize: 14,
    fontFamily: 'montserratMed',
    color: Colors.basicDetailLight,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.basicDetail,
    margin: 5,
    padding: 5,
    borderRadius: 20,
    width: 100,
  },

});

export default styles;
