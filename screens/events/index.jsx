import React, {useState, useEffect} from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import {globalStyles} from '../../styles/global'
import * as mockData from '../../mockData/mockData';
import axios from 'axios';
import LoadingScreen from '../../shared/LoadingScreen'
import ListScreen from './listView'
import MapScreen from './mapView'
import ToggleButton from './ToggleButton'


const Events = ({navigation}) => {

  // ListView = false, MapView = true
  const [listView, setlistView] = useState(true);

  const toggleView = () => {
    setStatus({...status, isLoading:true})

    setTimeout(()=>{
      Promise.resolve({data:"Map Data Here"})
      .then(res=>{
        setlistView(!listView);
        setStatus({...status, isLoading:false})
      })
      .catch(err=>{
        setStatus({
          error: true,
          isLoading:false,
          isLoadingMore:false
        })
      })
     },1000)
  }

  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState({
    error:false,
    isLoading:true,
    isLoadingMore:false
  })

  let initialEvents;

  useEffect(()=>{
    // axios.get("/events",{lat:123,long:123})
    initialEvents = mockData.eventsFromBackend.events
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
    }, 500);
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
    }, 500);
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (true) {
      try {
        // let response = await axios.get(
        //   '/events'
        // );
        let response = {data:[
          {
          "id":"123123123",
          "name":"Data after refreshing"
          }
        ]}
        // let responseJson = await response.json();
        // console.log(responseJson);
        setEvents([...response.data,...initialEvents]);
        setRefreshing(false)
      } catch (error) {
        console.error(error);
      }
    }
    else{
      // ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false)
    }
  }, [refreshing]);


  if(status.isLoading) {
    return (<LoadingScreen/>)
  }
  return (
    <SafeAreaView style={globalStyles.container}>
       {listView?
         <ListScreen 
         navigation={navigation} 
         refreshing={refreshing}
         onRefresh={onRefresh} 
         loadMore={loadMore} 
         status={status}
         events={events}
       />
      :
      <MapScreen 
      navigation={navigation} 
      refreshing={refreshing}
      onRefresh={onRefresh} 
      loadMore={loadMore} 
      status={status}
      events={events}
    />
    }
      <ToggleButton listView={listView} toggleView={toggleView}/>
    </SafeAreaView>
  ) 
}

export default Events