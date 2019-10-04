import { StyleSheet } from 'react-native';
import Colors from '../../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.1,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  title: {
    color: Colors.basicTextDark,
    fontSize: 25,
    fontFamily: 'montserratBold',

  },
  contentContainer: {
    flex: 1,
  },
  hangoutCardTitle: {
    fontFamily: 'montserratBold',
    position: 'absolute',
    color: Colors.basicText,
    fontSize: 17,
  },
  hangoutCard: {
    height: 200,
    width: 175,
    marginHorizontal: 5,
    backgroundColor: Colors.basicDetail,
  },
  hangoutCardTopContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hangoutCardMiddleContainer: {
    flex: 0.6,
    backgroundColor: Colors.basicDetailLight,
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  hangoutCardBottomContainer: {
    flex: 0.3,
    backgroundColor: Colors.basicDetail,
    justifyContent: 'center',
    marginBottom: 30,
    alignItems: 'center',
  },

  hangoutCardTime: {
    fontSize: 14,
    fontFamily: 'montserratMed',
    color: 'black',
  },
  hangoutCardMaxPeople: {
    fontSize: 14,
    fontFamily: 'montserratMed',
    color: Colors.basicTextDark,
  },
  hangoutCardDistance: {
    color: Colors.basicText,
    fontSize: 14,
    fontFamily: 'montserratBold',
  },
});

export default styles;
