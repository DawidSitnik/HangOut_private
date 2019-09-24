import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    color: Colors.basicText,
  },

  underListBox: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  buttonSend: {
    flex: 0.2,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.basicDetail,
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 10,
  },

  inputMessage: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    marginHorizontal: 10,
  },

  buttonText: {
    color: Colors.basicText,
    fontFamily: 'montserrat',
  },

  myMessageCard: {
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    marginHorizontal: 10,
    marginBottom: 0,
    backgroundColor: Colors.basicDetail,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: 15,
    color: '#fff',
  },

  friendMessageCard: {
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
    backgroundColor: Colors.basicDetailGrey,
    color: Colors.basicText,
    overflow: 'hidden',
    borderRadius: 15,
  },

  message: {
    fontSize: 15,
    color: Colors.basicText,
  },

});

export default styles;
