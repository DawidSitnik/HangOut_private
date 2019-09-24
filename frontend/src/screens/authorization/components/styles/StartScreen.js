import { StyleSheet } from 'react-native';
import Colors from '../../../../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.basicBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.basicDetail,
    height: 100,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 55,
    backgroundColor: Colors.basicDetail,
    margin: 10,
    padding: 8,
    borderRadius: 16,
  },
  text: {
    color: Colors.basicTextDark,
    fontSize: 24,
    bottom: 50,
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
