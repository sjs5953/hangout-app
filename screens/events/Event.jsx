import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, Alert,ActivityIndicator } from 'react-native'
import Card from '../../shared/Card'
import {FlatButton} from '../../shared/Button';
import axios from 'axios';
import {eventsFromBackend} from '../../mockData/mockData'
import {globalStyles} from '../../styles/global'


const getEvent = (key) => {
  const event = eventsFromBackend.events.filter(event=>(
    event.id == key
  ))

  return event[0]
}


const Event = ({navigation, route}) => {

  const eventKey = route.params.eventKey;

  const deleteEvent = () => {
    // axios.delete(`/events/${item.id}`)
    setIsLoading(true);
    setTimeout(() => {
      Promise.resolve()
    .then(res=>{
      Alert.alert('Success!','Event has been sucessfully deleted.', [
        {text:'understood', onPress: ()=>  {
          navigation.goBack();
          setIsLoading(false);
        } }
        ])
    })
    .catch(err=>{
      setIsLoading(false);
       Alert.alert('Oops!',`Failed to delete event! Please try again!`, [
        {text:'understood', onPress: ()=> {
          console.log('Delete request faild!', err);
        }}
        ])
    })
    }, 2500);
    
  };

  const handlePress = () => {
 
    Alert.alert(
      'Please Confirm',
      'Are you sure you want to delete?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Confirm', onPress: () => { deleteEvent() }},
      ],
      { cancelable: false }
    )
  }

  const [event, setEvent] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
      setTimeout(() => {
      // axios.get(`/events/${event.id}`)
      Promise.resolve({data:getEvent(eventKey)})
        .then(res=>{
          setError(false);
          const result = res.data;
          setEvent(result);
          setIsLoading(false);
        })
        .catch((err)=>{
          setError(true);
          console.log("err: ",err)
          setIsLoading(false);
        })
      }, 1000);
  },[]);

  
  if(isLoading) {
    return (<View style={styles.loadingContainer}><ActivityIndicator animating size={'large'}/></View>)
  }

  return (
    <View style={styles.container}>
    {error? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
     :
     <>
       <Card>
        <Text>Event Name: {event.name}</Text>
        <Text>Min Participants:  {event.minimumParticipants}</Text>
        <Text>Address: {event.address}</Text>
       </Card>
      <FlatButton style={styles.deleteButton} text={'Delete'} onPress={handlePress}/>
     </>
    }
    </View>
  )
}

export default Event

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent:'center',
    alignItems:'center',
    flex:1
  }
})
