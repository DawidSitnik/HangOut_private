import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  rootList: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  userCard: {
    height: 50,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  nameAndMessageCard: {
    flexDirection: 'column',
  },
  friendName: {
    flex: 0.5,
    fontFamily: 'montserratMed',
    top: 7,
    left: 20,
    fontSize: 18,
    color: Colors.basicTextDark,
  },
  firstMessage: {
    flex: 0.5,
    fontFamily: 'montserrat',
    top: 3,
    marginTop: 5,
    left: 22,
    fontSize: 14,
    color: Colors.basicDetailDark,
  },

  image: {
    left: 10,
    top: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default styles;
