import React, {useState, useEffect} from 'react'
import { View, SafeAreaView } from 'react-native'
import {globalStyles} from '../../styles/global'
import * as mockData from '../../mockData/mockData';
import axios from 'axios';
import LoadingScreen from '../../shared/LoadingScreen'
import ListScreen from './EventsListScreen'
import MapScreen from './EventsMapScreen'
import ToggleButton from './components/ToggleButton'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'
import { Button } from 'react-native-paper';

const Events = ({navigation,route}) => { 

  const [state, setState] = useState({
    events:[],
    currentPage:1,
    totalPages:null,
    status:LOADING,
    listView: true
  });

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

  const onRefresh = async (loading) => {
    const loadingStatus = loading || REFRESHING
    setState({...state, status:loadingStatus})
    console.log("fetching data...")
    if (true) {
      try {
        let res = await axios.get('https://meetnow.herokuapp.com/events?limit=5&page=1')
        const result = res.data;
        let newEvents = result.events;
        console.log("successfully fetched! ",newEvents.length)
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
  
  useEffect(()=>{
    console.log("refreshed")
    onRefresh(LOADING)
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

  const searchEvents = async (searchField, searchValue) => {
    setState({...state, status:LOADING})
 
    try {
      let res = await axios.get(`https://meetnow.herokuapp.com/events?limit=5&page=1&${searchField}=${searchValue}`)
      const result = res.data;
      let newEvents = result.events;
      console.log("successfully fetched! ",newEvents.length)
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

  // console.log("i am rerendered and the events are :",state.events.length)

  // console.log("list view: ", state.listView)

  // const test = () => {
  //   axios.get('http://192.168.0.31:3000/')
  //   .then(console.log)
  // }

  if(state.status == LOADING) {
    return (<LoadingScreen/>)
  }
  return (
    <SafeAreaView style={globalStyles.container}>   
    {/* <Button onPress={()=>{
        axios.get('http://localhost:3000/events')
          .then(console.log)
          .catch(err=>{
            console.log(err.message)
          })
      }}> 
        Click
      </Button>   */}
       {state.listView?
         <ListScreen 
         navigation={navigation} 
         onRefresh={onRefresh} 
         loadMore={loadMore} 
         status={state.status}
         events={state.events}
         searchEvents={searchEvents}
       />
      :
      <MapScreen 
      navigation={navigation} 
      onRefresh={onRefresh} 
      loadMore={loadMore} 
      status={state.status}
      events={state.events}
      searchEvents={searchEvents}
    />
    }
      <ToggleButton listView={state.listView} toggleView={toggleView}/>
    </SafeAreaView>
  ) 
}

export default Events



 // useEffect(()=>{
  //   axios.get(`https://meetnow.herokuapp.com/events?limit=5&page=${state.currentPage}`)
  //   .then(res=>{
  //     // result = res.data;
  //   })
  //   .catch(err=>{
  //     error = true;
  //   })
  // },[]);
