import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { RoundButton } from '../../shared/Button';
import { AntDesign, FontAwesome5, Ionicons, Foundation, Fontisto } from '@expo/vector-icons';

import * as mockData from '../../mockData/mockData';
import axios from 'axios';


// const events = [
//   {title: 'Pickup Soccer Game', location: '123', time:'', key:'1'},
//   {title: 'Pokemon Go Raid', location: '123', time:'', key:'2'},
//   {title: 'Cooking Breads', location: '123', time:'', key:'3'},
//   {title: 'Playing Chess', location: '123', time:'', key:'4'},
//   {title: 'Playing SuperSmash', location: '123', time:'', key:'5'},
// ]

const Events = ({navigation,route}) => {

  // ListView = false, MapView = true
  const [listView, setlistView] = useState(true);

  const toggleView = () => {
    setlistView(!listView);
  }

  const [events, setEvents] = useState([]);

  useEffect(()=>{
    // const initialEvents = await axios.get("https://postman-echo.com/events");
    const initialEvents = mockData.eventsFromBackend.events;
    setEvents(initialEvents);
  },[]);


  if (route.params && route.params.submitted) {
    let addedEvent = route.params.submitted;
    addedEvent.id = Math.random().toString();
    // const newState = [
    //   ...events, addedEvent
    // ];
    // setEvents(newState);
    console.log(addedEvent);
  }

  return (
    <View style={globalStyles.container}>
      {listView? 
         <FlatList
         keyExtractor={item=>item.id.toString()}
         data={events}
         renderItem={({item})=>(
           <TouchableOpacity style={globalStyles.titleText} onPress={debounce(
             () =>
             navigation.push('Event', {item,setEvents}), 500,{
               'leading': true,
               'trailing': false
             }
           )}>
             <Card>
               <Text style={globalStyles.titleText}>
                 {item.name}
               </Text>
             </Card>
           </TouchableOpacity>
         )}
       />
        :
        <Text style={globalStyles.titleText}>MapView!</Text>
        }
     
    {/* a component that needs to stay for all screens inside events screen */}
      <View style={styles.toggleContainer}>
        <RoundButton style={styles.toggleButton} onPress={toggleView}>
          {listView?
            <FontAwesome5 name="map" color={"black"} size={30} /> :
            <FontAwesome5 name="list-ul" color={"black"} size={30} />}
        </RoundButton>
      </View>
    </View>
  )
}

export default Events

const styles = StyleSheet.create({
  toggleContainer:{
    position:'absolute',
    bottom:20,
    right:25,
    flexDirection:'row',
    justifyContent:'flex-end'
  },
})
