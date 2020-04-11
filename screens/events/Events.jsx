import React, {useState, useEffect} from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import {globalStyles} from '../../styles/global'
import * as mockData from '../../mockData/mockData';
import axios from 'axios';
import LoadingScreen from '../../shared/LoadingScreen'
import ListScreen from './EventsListScreen'
import MapScreen from './EventsMapScreen'
import ToggleButton from './ToggleButton'

// status list
const ERROR = "error";
const REFRESHING = "refreshing";
const LOADING = "loading";
const LOADINGMORE = "loading-more";


const Events = ({navigation,route}) => { 

  const [state, setState] = useState({
    events:[],
    currentPage:1,
    totalPages:null,
    status:LOADING,
    listView: true
  });

  useEffect(()=>{
    // axios.get("/events",{lat:123,long:123})
    axios.get(`https://meetnow.herokuapp.com/events?limit=5&page=${state.currentPage}`)
    .then(res=>{
      const result = res.data;
      setState({
        ...state,
        events: result.events,
        totalPages:result.totalPages,
        status:""
      })
    })
    .catch(err=>{
      setState({...state, status:ERROR})
    })
  },[]);


  const loadMore = () => {
    if (state.currentPage == state.totalPages) return;
    
    console.log("loaded more")
    setState({...state, status:LOADINGMORE})

    axios.get(`https://meetnow.herokuapp.com/events?limit=5&page=${state.currentPage+1}`)
      .then(res=>{
        const result = res.data;
        const moreEvents = result.events;
        setState({
          ...state,
          events:[...state.events,...moreEvents],
          currentPage: state.currentPage+1,
          totalPages: result.totalPages,
          status:""
        });
      })
      .catch(err=>{
        setState({...state, status:ERROR})
        console.log(err)
      })
  }

  const onRefresh = async () => {
    setState({...state, status:REFRESHING})
    if (true) {
      try {
        let res = await axios.get('https://meetnow.herokuapp.com/events?limit=5&page=1')
        const result = res.data;
        let newEvents = result.events;
        setState({
          ...state,
          events:newEvents,
          currentPage:1,
          totalPages:result.totalPages,
          status:""
        });
      } catch (error) {
        setState({...state, status:ERROR})
        console.error(error);
      }
    }
    else{
      // ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false)
    }
  }
  
  // console.log("route ",route.params)
  useEffect(()=>{
    console.log("refreshed")
    onRefresh()
  },[route.params])

  const toggleView = () => {
    setState({...state, status:LOADING})
      Promise.resolve({data:"Map Data Here"})
      .then(res=>{
        setState({
          ...state,
          listView: !state.listView
        })
      })
      .catch(err=>{
        setState({...state, status:ERROR})
      })
  }


  // console.log("i am rerendered and the events are :",state.events.length)

  // console.log("list view: ", state.listView)


  if(state.status == LOADING) {
    return (<LoadingScreen/>)
  }
  return (
    <SafeAreaView style={globalStyles.container}>
       {state.listView?
         <ListScreen 
         navigation={navigation} 
         onRefresh={onRefresh} 
         loadMore={loadMore} 
         status={state.status}
         events={state.events}
       />
      :
      <MapScreen 
      navigation={navigation} 
      onRefresh={onRefresh} 
      loadMore={loadMore} 
      status={state.status}
      events={state.events}
    />
    }
      <ToggleButton listView={state.listView} toggleView={toggleView}/>
    </SafeAreaView>
  ) 
}

export default Events