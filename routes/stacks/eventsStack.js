import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Events from '../../screens/events/Events';
import Event from '../../screens/events/Event';


const EventsStack = createStackNavigator();

export default function EventsStackScreen () {
  return (
  <EventsStack.Navigator>
    <EventsStack.Screen name='Events' component={Events} options={{title: 'Events List'}} />
    <EventsStack.Screen name='Event' component={Event} options={{title:'One Particular Event'}}/>
  </EventsStack.Navigator>
  )}