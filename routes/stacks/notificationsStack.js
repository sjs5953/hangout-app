import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Notifications from '../../screens/notifications/index';

const NotificationsStack = createStackNavigator();

export default function NotificationsStackScreen () {
  return (
  <NotificationsStack.Navigator>
    <NotificationsStack.Screen name='notifications' component={Notifications} options={{title: 'Notifications'}} />
  </NotificationsStack.Navigator>
  )}