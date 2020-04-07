import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity, SafeAreaView, ActivityIndicator, Button } from 'react-native'
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
 
  const [status, setStatus] = useState({
    error:false,
    isLoading:true,
    isLoadingMore:false
  })


  useEffect(()=>{
    // axios.get("/events",{lat:123,long:123})
    const initialEvents = mockData.eventsFromBackend.events
    setTimeout(() => {
      Promise.resolve({data:initialEvents})
      .then(res=>{
        const result = res.data;
        setEvents(result);
        setStatus({
          error: false,
          isLoading:false,
          isLoadingMore:false
        })
      })
      .catch(err=>{
        setStatus({
          error: true,
          isLoading:false,
          isLoadingMore:false
        })
      })
    }, 1000);
  },[]);
    // console.log("what about here?")
    const loadMore = () => {
      console.log(events.length)
      setStatus({...status,isLoadingMore:true});
      const moreEvents =[]
   
      for (let i=0; i<5; i++) {
        const id = (Math.random()*100).toString();
        const name = `event ${i}`
        const newEvent = {
          id,
          name
        }
        moreEvents.push(newEvent);
      }

      setTimeout(() => {
        Promise.resolve({data:moreEvents})
        .then(res=>{    
          const moreEvents = res.data;
          setEvents([...events, ...moreEvents]);
          setStatus({
            error: false,
            isLoading:false,
            isLoadingMore:false
          })
        })
        .catch(err=>{
          setStatus({
            error: true,
            isLoading:false,
            isLoadingMore:false
          })
        })
      }, 1000);
    }

    const renderFooter = () => {
      if (status.isLoadingMore)
      return <ActivityIndicator animating size={'large'}/>
    }

  if(status.isLoading) {
    return (<View style={styles.loadingContainer}><ActivityIndicator animating size={'large'}/></View>)
  }

  return (
    <SafeAreaView style={globalStyles.container}>

    {status.error? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
     :
     listView? 
      <FlatList
      keyExtractor={item=>item.id.toString()}
      data={events}
      onEndReached={()=> loadMore()}
      ListFooterComponent={renderFooter()}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={<View style={styles.noResults}><Text>No results found</Text></View>}
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
  },
  noResults :{
    justifyContent:'center',
    alignItems:'center',
    flex:2,
    marginTop:20
  }
})
