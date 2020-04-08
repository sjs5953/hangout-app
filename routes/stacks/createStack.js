import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Create from '../../screens/create/index';

const CreateStack = createStackNavigator();

export default function CreateStackScreen ({navigation}) {
  
  return (
  <CreateStack.Navigator mode="modal">
    <CreateStack.Screen name='Create' component={Create} options={{title: 'Post Event'}} 
    // initialParams={{ "tabNavi":navigation }}
 />
  </CreateStack.Navigator>
  )}