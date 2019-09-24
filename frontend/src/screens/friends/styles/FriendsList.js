import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  userCard: {
    height: 50,
    marginHorizontal: 5,

  },
  userName: {
    fontFamily: 'montserrat',
    position: 'absolute',
    top: 20,
    left: 60,
    fontSize: 17,
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
