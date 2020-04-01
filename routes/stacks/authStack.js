import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../screens/sign-in-up/SignIn';
import SignUp from '../../screens/sign-in-up/SignUp';

const AuthStack = createStackNavigator();

export default function AuthStackScreen () {
  return (
  <AuthStack.Navigator>
    <AuthStack.Screen name='SignIn' component={SignIn} options={{title: 'Login', animationEnabled:false}} />
    <AuthStack.Screen name='SignUp' component={SignUp} options={{title:'Create Account'}}/>
  </AuthStack.Navigator>
  )}