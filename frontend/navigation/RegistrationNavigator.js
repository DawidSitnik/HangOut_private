import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import RegistrationScreen from '../src/screens/authorization/RegistrationScreen';
import LoginScreen from '../src/screens/authorization/LoginScreen';
import StartScreen from '../src/screens/authorization/StartScreen';
import Colors from '../constants/Colors';

const StartSwitch = createStackNavigator({
  Start: StartScreen,
  Login: LoginScreen,
  Registration: RegistrationScreen,
}, AuthorizationTab);


const AuthorizationTab = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    labelStyle: {
      fontSize: 10,
      pressColor: Colors.basicDetail,
      indicatorStyle: {
        backgroundColor: Colors.basicDetail,
      }
    },
    style: {
      backgroundColor: Colors.basicDetail,
    },
    showLabel: true,
    inactiveTintColor: Colors.basicDetail,
  },
};

export default createSwitchNavigator({
  StartSwitch,
}, AuthorizationTab);
