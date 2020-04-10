import React,{useEffect, useState} from 'react'
import { Alert } from 'react-native'
import axios from 'axios';
import {eventsFromBackend} from '../../mockData/mockData'
import LoadingScreen from '../../shared/LoadingScreen'
import EventScreen from  './EventScreen';

const getEvent = (key) => {
  const event = eventsFromBackend.events.filter(event=>(
    event.id == key
  ))

  return event[0]
}


const Event = ({navigation, route}) => {

  const eventKey = route.params.eventKey;

  console.log("eventkey: ", eventKey)

  const deleteEvent = () => {
   
    setIsLoading(true);
   
    axios.delete(`https://meetnow.herokuapp.com/events/${eventKey}`)
    .then(res=>{
      Alert.alert('Success!','Event has been sucessfully deleted.', [
        {text:'understood', onPress: ()=>  {
          navigation.goBack();
          setIsLoading(false);
        }}
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
        axios.get(`https://meetnow.herokuapp.com/events/${eventKey}`)
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
    return (<LoadingScreen/>)
  }

  return (
    <EventScreen handlePress={handlePress} event={event} error={error} />
  )
}

export default Event