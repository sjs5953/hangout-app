import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
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
  const [isLoading, setIsLoading] = useState(true);


  useEffect(()=>{
    // axios.get("/events",{lat:123,long:123})
    const initialEvents = mockData.eventsFromBackend.events;
    setTimeout(() => {
      Promise.resolve({data:initialEvents})
      .then(res=>{
        setError(false);
        setIsLoading(false);
        const result = res.data;
        setEvents(result);
      })
      .catch(err=>{
        setError(true);
        setIsLoading(false);
      })
    }, 1000);
   
  },[]);


    // addedEvent.id = Math.random().toString();


  if(isLoading) {
    return (<View style={styles.loadingContainer}><ActivityIndicator animating size={'large'}/></View>)
  }

  return (
    <SafeAreaView style={globalStyles.container}>

    {error? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
     :
     listView? 
      <FlatList
      keyExtractor={item=>item.id.toString()}
      data={events}
      // ListFooterComponent={<ActivityIndicator animating size={'large'}/>}
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
    //  <Text style={globalStyles.titleText}>MapView!</Text>
    <ActivityIndicator animating size={'large'}/>
    }
     
     
    {/* a component that needs to stay for all screens inside events screen */}
      <View style={styles.toggleContainer}>
        <RoundButton onPress={toggleView}>
          {listView?
            <FontAwesome5 name="map" color={"black"} size={30} /> :
            <FontAwesome5 name="list-ul" color={"black"} size={30} />}
        </RoundButton>
      </View>
    </SafeAreaView>
  )
}

export default Events

const styles = StyleSheet.create({
  toggleContainer:{
    position:'absolute',
    bottom:20,
    right:25
  },
  loadingContainer: {
    justifyContent:'center',
    alignItems:'center',
    flex:1
  }
})
