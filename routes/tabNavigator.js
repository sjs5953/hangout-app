import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// '@react-navigation/material-bottom-tabs';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';


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
        <Tabs.Screen name='EventsStack' component={EventsStackScreen} labeled={false} options={{
          tabBarLabel:"Home",
          tabBarIcon: ({color, focused}) => <AntDesign name="home" color={color} size={27} />
        }}/>
        <Tabs.Screen name='CreateStack' component={CreateStackScreen} options={{
          tabBarLabel:"Create",
          tabBarIcon: () => <FontAwesome name="plus-square-o" size={27} />
        }}/>
        <Tabs.Screen name='NotificationsStack' component={NotificationsStackScreen} options={{
          tabBarLabel:"Notification",
          tabBarIcon: () => <Ionicons name="ios-notifications-outline" size={27} />
        }}/>
        <Tabs.Screen name='UserStack' component={UserStackScreen} options={{
          tabBarLabel:"Profile",
          tabBarIcon: () => <AntDesign name="user" size={27} />
        }}/>
      </Tabs.Navigator>
      : <AuthStackScreen />
    }
    
  </NavigationContainer>
  )}