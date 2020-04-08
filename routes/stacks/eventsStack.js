import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Events from '../../screens/events/index';
import Event from '../../screens/event/index';


const EventsStack = createStackNavigator();

export default function EventsStackScreen () {
  return (
  <EventsStack.Navigator mode="modal" >
    <EventsStack.Screen name='Events' component={Events} options={{title: 'Events List'}} />
    <EventsStack.Screen name='Event' component={Event} 
    // options={(({route})=>({title:route.params.item.name}))}
    options={{title:''}}
    />
  </EventsStack.Navigator>
  )}