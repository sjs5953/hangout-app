import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { RoundButton } from '../../shared/Button';
import { AntDesign, FontAwesome5, Ionicons, Foundation, Fontisto } from '@expo/vector-icons';

import * as mockData from '../../mockData/mockData';
import axios from 'axios';


const Events = ({navigation,route}) => {

  // ListView = false, MapView = true
  const [listView, setlistView] = useState(true);

  const toggleView = () => {
    setlistView(!listView);
  }

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);

  useEffect(()=>{
    // axios.get("/events",{lat:123,long:123})
    const initialEvents = mockData.eventsFromBackend.events;
    Promise.resolve({data: initialEvents})
    .then(res=>{
      setError(false);
      const result = res.data;
      setEvents(result);
    })
    .catch(err=>{
      setError(true);
    })
  },[]);


    // addedEvent.id = Math.random().toString();

  return (
    <View style={globalStyles.container}>

      {error? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
     :
     listView? 
      <FlatList
      keyExtractor={item=>item.id.toString()}
      data={events}
      renderItem={({item})=>(
        <TouchableOpacity style={globalStyles.titleText} onPress={debounce(
          () =>
          navigation.push('Event', {eventKey:item.id}), 500,{
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
