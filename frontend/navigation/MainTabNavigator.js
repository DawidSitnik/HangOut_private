import React from 'react';
import { fromLeft } from 'react-navigation-transitions';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../src/screens/home/HomeScreen';
import FriendsScreen from '../src/screens/friends/FriendsScreen';
import SettingsScreen from '../src/screens/profile/ProfileScreen';
import UserProfile from '../src/screens/friends/UserProfile';
import FriendProfile from '../src/screens/friends/FriendProfile';
import AllUsersScreen from '../src/screens/friends/AllUsersScreen';
import ChatScreen from '../src/screens/chat/ChatScreen';
import ChatsList from '../src/screens/chat/ChatsList';
import CreateHangout from '../src/screens/hangouts/CreateHangout';
import HangoutCard from '../src/screens/hangouts/HangoutCard';
import FindHangout from '../src/screens/hangouts/FindHangout';
import FindOnTheMap from '../src/screens/hangouts/FindOnTheMap';
import ChooseLocation from '../src/screens/hangouts/ChooseLocation';
import HangoutCardLocation from '../src/screens/hangouts/HangoutCardLocation';
import FoundHangoutsList from '../src/screens/hangouts/FoundHangoutsList';
import MyHangouts from '../src/screens/hangouts/MyHangouts';
import PeopleInHangout from '../src/screens/hangouts/PeopleInHangout';
import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home:
  HomeScreen,
  CreateHangout,
  HangoutCard,
  FindHangout,
  FindOnTheMap,
  FoundHangoutsList,
  ChooseLocation,
  MyHangouts,
  HangoutCardLocation,
  PeopleInHangout,
  UserProfile,
}, {
  transitionConfig: () => fromLeft() },);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  swipeEnabled: true,
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      color={tintColor}
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'
      }
    />
  ),
};

const FriendsStack = createStackNavigator({
  Friends:
  FriendsScreen,
  UserProfile,
  FriendProfile,
  AllUsersScreen,
  ChatScreen,
});

FriendsStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      color={tintColor}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const ChatsStack = createStackNavigator({
  Chats:
  ChatsList,
  ChatScreen,
});

ChatsStack.navigationOptions = {
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      color={tintColor}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      color={tintColor}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    labelStyle: {
      fontSize: 10,
      pressColor: Colors.redColor,
      indicatorStyle: {
        backgroundColor: Colors.redColor,
      },
    },
    style: {
      backgroundColor: Colors.whiteColor,
    },
    showLabel: false,
    inactiveTintColor: '#e91e63',
  },

};

export default createMaterialTopTabNavigator({
  HomeStack,
  ChatsStack,
  FriendsStack,
  SettingsStack,
}, TabNavigatorConfig);
