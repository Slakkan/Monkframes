import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import InfoScreen from '../screens/InfoScreen';
import AlbumsScreen from '../screens/AlbumsScreen';

const HomeStack = createStackNavigator({
  Albums: AlbumsScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'collections'}
    />
  ),
};

const InfoStack = createStackNavigator({
  Info: InfoScreen,
});

InfoStack.navigationOptions = {
  tabBarLabel: 'info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'info'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  InfoStack
});
