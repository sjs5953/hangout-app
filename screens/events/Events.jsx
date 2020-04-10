import React, {useState, useEffect} from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import {globalStyles} from '../../styles/global'
import * as mockData from '../../mockData/mockData';
import axios from 'axios';
import LoadingScreen from '../../shared/LoadingScreen'
import ListScreen from './EventsListScreen'
import MapScreen from './EventsMapScreen'
import ToggleButton from './ToggleButton'

const Events = ({navigation}) => {

  // ListView = false, MapView = true
  const [listView, setlistView] = useState(true);

  const toggleView = () => {
    setStatus({...status, isLoading:true})

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
  }

  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState({
    data:[],
    currentPage:1
  });
  const [status, setStatus] = useState({
    error:false,
    isLoading:true,
    isLoadingMore:false
  })

  useEffect(()=>{
    // axios.get("/events",{lat:123,long:123})

    axios.get(`https://meetnow.herokuapp.com/events?page=${events.currentPage}`)
    .then(res=>{
      // console.log(res.data)
      const result = res.data[0];

      setEvents({
        ...events,
        data: result.events,
      });
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
  },[]);

  const loadMore = () => {
    setStatus({...status,isLoadingMore:true});
    axios.get(`https://meetnow.herokuapp.com/events?page=${events.currentPage+1}`)
      .then(res=>{
        const result = res.data[0];
        if (events.currentPage != result.totalPage){
          const moreEvents = result.events;
          setEvents({
            data:[...events.data,...moreEvents],
            currentPage: events.currentPage+1,
            totalPage: result.totalPage
          });
          setStatus({
            error: false,
            isLoading:false,
            isLoadingMore:false
          })
        } else {
          setTimeout(()=>{
            setStatus({
              error: false,
              isLoading:false,
              isLoadingMore:false
            })
          },1500)
        }
      })
      .catch(err=>{
        setStatus({
          error: true,
          isLoading:false,
          isLoadingMore:false
        })
        console.log(err)
      })
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (true) {
      try {
        let result = await axios.get('https://meetnow.herokuapp.com/events?page=1')
        let newEvents = result.data[0].events;
        // let resultJson = await result.json();
        // console.log(resultJson);
        setEvents({
          data:newEvents,
          currentPage:1,
          totalPage:result.totalPage
        });
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
         events={events.data}
       />
      :
      <MapScreen 
      navigation={navigation} 
      refreshing={refreshing}
      onRefresh={onRefresh} 
      loadMore={loadMore} 
      status={status}
      events={events.data}
    />
    }
      <ToggleButton listView={listView} toggleView={toggleView}/>
    </SafeAreaView>
  ) 
}

export default Events