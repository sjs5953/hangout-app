import React from 'react';
import {TouchableOpacity, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../screens/login/SignIn';
// import Browser from '../../screens/login/components/Browser'

const AuthStack = createStackNavigator();

export default function AuthStackScreen ({navigation}) {

  return (
  <AuthStack.Navigator mode="modal" >
    <AuthStack.Screen name='SignIn' component={SignIn} options={{title: 'Login', animationEnabled:false}} />
    {/* <AuthStack.Screen name='browser' component={Browser} /> */}
  </AuthStack.Navigator>
  )}