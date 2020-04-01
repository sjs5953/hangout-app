import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Create from '../../screens/create/Create';

const CreateStack = createStackNavigator();

export default function CreateStackScreen () {
  return (
  <CreateStack.Navigator>
    <CreateStack.Screen name='Create' component={Create} options={{title: 'Post Event'}} />
  </CreateStack.Navigator>
  )}