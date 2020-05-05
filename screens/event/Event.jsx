import React,{useEffect, useState, useContext} from 'react'
import { Alert } from 'react-native'
import axios from 'axios';
import { AuthContext } from '../../context'

import LoadingScreen from '../../shared/LoadingScreen'
import EventScreen from  './EventScreen';
import { ERROR, LOADING } from '../../shared/status'


const Event = ({navigation, route}) => {

  const eventKey = route.params.eventKey;
  const userToken = useContext(AuthContext).userToken;
  console.log("userToken is: ",userToken)

  console.log("eventkey: ", eventKey)

  const [state, setState] = useState({
    event:{},
    status:LOADING
  })

  const deleteEvent = () => {
   
    setState({...state, status:LOADING})
    const options = {
      "url": `https://meetnow.herokuapp.com/events/${eventKey}`,
      "method": "DELETE",
      "headers": {
      'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json"
      }
    }
   
    axios(options)
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
  
  const [voted, setVoted] = useState(state.event.hasVoted||false);

  const handleVote = async() => {
    const voteState = voted? "unvote":"vote";
   
    const options = {
      "url": `https://meetnow.herokuapp.com/events/${eventKey}/${voteState}`,
      "method": voteState=='vote'?'POST':'PUT',
      "headers": {
      'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json"
      }
    }
    console.log("try voting: ", voteState,options)

    try{
      await axios(options)
      await setVoted(!voted)
      console.log("voting finished: ", voteState)
    }
    catch (err) {
      console.log("error from voting: ", err)
    }
  }

  useEffect(()=>{
    const options = {
      "url": `https://meetnow.herokuapp.com/events/${eventKey}`,
      "method": "GET",
      "headers": {
      'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json"
      }
    }
    axios(options)
    .then(res=>{
      const result = res.data;
      console.log("event: ", result)
      setState({...state, event:result,status:""})
    })
    .catch((err)=>{
      setState({...state, status:ERROR})
    })
    console.log("==========I RAN!!!!!=======")
  },[voted]);

  
  if(state.status == LOADING) {
    return (<LoadingScreen/>)
  }

  return (
    <EventScreen handlePress={handlePress} event={state.event} status={state.status} handleVote={handleVote} voted={voted}/>
  )
}

export default Event