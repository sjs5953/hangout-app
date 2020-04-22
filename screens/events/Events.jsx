import React, {useState, useEffect} from 'react'
import { View, SafeAreaView, Platform } from 'react-native'
import {globalStyles} from '../../styles/global'
import axios from 'axios';
import EventsScreen from './EventsScreen'
import ToggleButton from './components/ToggleButton'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const isIos = Platform.OS === 'ios'

const Events = ({navigation,route}) => { 

  const [state, setState] = useState({
    events:[],
    location:{},
    currentPage:1,
    totalPages:null,
    status:LOADING,
    listView: true
  });
  
  const getOptions = (page, location) => {
    return {
    "url": `https://meetnow.herokuapp.com/events?limit=5&page=${page}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": location,
  }};

  const loadMore = () => {
    if (state.currentPage == state.totalPages) return;
    
    console.log("loaded more")
    setState({...state, status:LOADINGMORE})

    const options = getOptions(state.currentPage+1,state.location)
    console.log("Load More request: ", options)
    axios(options)
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
 
    try {

      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setState({...state, status:ERROR});
        alert('Permission to access location was denied')
      }
      
      let resultingLocation = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: resultingLocation.coords.latitude,
        longitude: resultingLocation.coords.longitude
      }
      const options = getOptions(1,userLocation)
      let res = await axios(options)
      const result = res.data;
      let newEvents = result.events;

      console.log("successfully fetched! ",newEvents.length)
      console.log("refreshing options: ",options)
      setState({
          ...state,
          location:userLocation,
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
  
  const searchEvents = async (searchField, searchValue, searchField2, searchValue2) => {
    setState({...state, status:LOADING})
    let url = `https://meetnow.herokuapp.com/events?limit=5&page=1&${searchField}=${searchValue}`
    if(searchField2 && searchValue2) {
      url += `&${searchField2}=${searchValue2}`
    }
    
    let options = getOptions(1,state.location);
    options.url = url;
    console.log('Search Request',options)
    
    try {
      let res = await axios(options)
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
      console.log("not found")
      setState({...state, status:ERROR})
      console.error(error);
    }
  }
 
   useEffect(()=>{
    console.log("refreshed")
    onRefresh(LOADING)
  },[route.params])
  
  return (
    <View style={globalStyles.container}>
         <EventsScreen 
          navigation={navigation} 
          onRefresh={onRefresh} 
          loadMore={loadMore} 
          status={state.status}
          events={state.events}
          listView={state.listView}
          searchEvents={searchEvents}
       />
      <ToggleButton listView={state.listView} toggleView={toggleView}/>
    </View>
  ) 
}

export default Events


  // useEffect(()=>{
  //   Location.requestPermissionsAsync()
  //   .then(({status})=>{
  //     if (status !== 'granted') {
  //       setState({...state, status:ERROR})
  //     }
  //     return Location.getCurrentPositionAsync({})
  //     })
  //   .then(res=>{
      // const userLocation = {
      //   latitude: res.coords.latitude,
      //   longitude: res.coords.longitude
      // }
  //     console.log("==========Setting Location ==========")
  //     setState({...state, location:userLocation});
  //     const settings = {
  //       "url": 'https://meetnow.herokuapp.com/events?limit=5&page=1',
  //       "method": "GET",
  //       "timeout": 0,
  //       "headers": {
  //         "Content-Type": "application/json"
  //       },
  //       "data": JSON.stringify(userLocation),
  //     };
  //     // console.log("userlocation: ", userLocation)
  //     return axios(settings)
  //   })
  //   .then(res=>{
  //     const result = res.data;
  //     const fectchedEvetns = result.events;
  //     setState({
  //       ...state,
  //       events:fectchedEvetns,
  //       currentPage: 1,
  //       totalPages: result.totalPages,
  //       status:""
  //     });
  //   })
  //   .catch(err=>{
  //     setState({...state, status:ERROR})
  //     console.log(err)
  //   })
  // },[])