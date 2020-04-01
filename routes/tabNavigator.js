import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import AuthStackScreen from './stacks/authStack'
import CreateStackScreen from './stacks/createStack'
import EventsStackScreen from  './stacks/eventsStack'
import UserStackScreen from './stacks/userStack'
import NotificationsStackScreen from  './stacks/notificationsStack'

const Tabs = createBottomTabNavigator();

export default function TabNavigator ({ userToken, setUserToken }) {
  return (
  <NavigationContainer>
    {userToken ? 
      <Tabs.Navigator>
        <Tabs.Screen name='EventsStack' component={EventsStackScreen}/>
        <Tabs.Screen name='CreateStack' component={CreateStackScreen}/>
        <Tabs.Screen name='NotificationsStack' component={NotificationsStackScreen}/>
        <Tabs.Screen name='UserStack' component={UserStackScreen}/>
      </Tabs.Navigator>
      : <AuthStackScreen />
    }
    
  </NavigationContainer>
  )}