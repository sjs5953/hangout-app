import React,{useEffect, useState} from 'react'
import { Alert } from 'react-native'
import axios from 'axios';
import {eventsFromBackend} from '../../mockData/mockData'
import LoadingScreen from '../../shared/LoadingScreen'
import EventScreen from  './EventScreen';

// status list
const ERROR = "error";
const LOADING = "loading";

const Event = ({navigation, route}) => {

  const eventKey = route.params.eventKey;

  console.log("eventkey: ", eventKey)

  const [state, setState] = useState({
    event:{},
    status:LOADING
  })

  const deleteEvent = () => {
   
    setState({...state, status:LOADING})
   
    axios.delete(`https://meetnow.herokuapp.com/events/${eventKey}`)
    .then(res=>{
      Alert.alert('Success!','Event has been sucessfully deleted.', [
        {text:'understood', onPress: ()=>  {
          setState({...state, status:""})
          navigation.navigate('Events',{updated:`Deleted: ${eventKey}`});
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


  useEffect(()=>{
    axios.get(`https://meetnow.herokuapp.com/events/${eventKey}`)
    .then(res=>{
      const result = res.data;
      setState({...state, event:result, status:""})
    })
    .catch((err)=>{
      setState({...state, status:ERROR})
    })
  },[]);

  
  if(state.status == LOADING) {
    return (<LoadingScreen/>)
  }

  return (
    <EventScreen handlePress={handlePress} event={state.event} status={state.status} />
  )
}

export default Event