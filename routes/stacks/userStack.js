import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import User from '../../screens/user/User';


const UserStack = createStackNavigator();

export default function UserStackScreen () {
  return (
  <UserStack.Navigator>
    <UserStack.Screen name='User' component={User} options={{title: 'User'}} />
  </UserStack.Navigator>
  )}