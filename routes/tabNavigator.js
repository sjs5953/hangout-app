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
      <Tabs.Navigator tabBarOptions={{showLabel:false}} >
        <Tabs.Screen name='EventsStack' component={EventsStackScreen} labeled={false} options={{
          // unmountOnBlur:true,
          tabBarLabel:"Home",
          tabBarIcon: ({color}) => <AntDesign name="home" color={color} size={30} />
        }}
        // listeners={{
        //   tabPress: e=>{
        //     console.log("im pressed: ", e)
        //   }
        // }}
        />
        <Tabs.Screen name='CreateStack' component={CreateStackScreen} options={{
          // unmountOnBlur:true,
          tabBarLabel:"Create",
          tabBarIcon: ({color}) => <FontAwesome name="plus-square-o" color={color} size={30} />
        }}/>
        {/* <Tabs.Screen name='NotificationsStack' component={NotificationsStackScreen} options={{
          tabBarLabel:"Notification",
          tabBarIcon: ({color}) => <Ionicons name="ios-notifications-outline" color={color} size={33} />
        }}/> */}
        <Tabs.Screen name='UserStack' component={UserStackScreen} options={{
          tabBarLabel:"Profile",
          tabBarIcon: ({color}) => <AntDesign name="user" color={color} size={30} />
        }}/>
      </Tabs.Navigator>
      : <AuthStackScreen />
    }
    
  </NavigationContainer>
  )}