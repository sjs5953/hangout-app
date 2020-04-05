import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from '../../shared/Card'
import {FlatButton} from '../../shared/Button';

const Event = ({navigation, route}) => {
  const event = route.params.item;
  
  const setEvents = route.params.setEvents;

  const handlePress = () => {
    setEvents((events)=>{
      const newState = [...events];
      for (let i = 0; i<events.length; i++) {
        if(events[i].id == event.id) {
         newState.splice(i,1);
         return newState;
        }
      }
    });
    navigation.goBack();
  }

  return (
    <View>
      <Card>
        <Text>Event Name: {event.name}</Text>
        <Text>Min Participants:  {event.minimumParticipants}</Text>
        <Text>Address: {event.address}</Text>
      </Card>
      <FlatButton style={styles.deleteButton} text={'Delete'} onPress={handlePress}/>
      {/* <Text>Voting Ends at: {event.voteEndTime}</Text>
      <Text>Event starts at: {event.startTime}</Text> */}
    </View>
  )
}

export default Event

const styles = StyleSheet.create({
})
