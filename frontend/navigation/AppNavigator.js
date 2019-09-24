import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import RegistrationNavigator from './RegistrationNavigator';
import MainTabNavigator from './MainTabNavigator';
import AuthorizationNavigator from './RegistrationNavigator';

export default createAppContainer(createSwitchNavigator({
  Authorization: AuthorizationNavigator,
  Main: MainTabNavigator,

}));
