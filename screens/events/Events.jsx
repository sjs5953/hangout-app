import React, {useState, useEffect, useContext} from 'react'
import { View,Alert, SafeAreaView, Platform, Linking, AppState, Dimensions } from 'react-native'
import * as IntentLauncher from 'expo-intent-launcher';
import {globalStyles} from '../../styles/global'
import axios from 'axios';
import EventsScreen from './EventsScreen'
import ToggleButton from './components/ToggleButton'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'
// import { Button } from 'react-native-paper';
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
// import Modal from 'react-native-modal'
const isIos = Platform.OS === 'ios'
import { AuthContext } from '../../context'


const Events = ({navigation,route}) => { 

  const [state, setState] = useState({
    events:[],
    currentPage:1,
    totalPages:null,
    status:LOADING,
    listView: true
  });

  
  const { userLocation, setUserLocation } = useContext(AuthContext)
 
  const getOptions = (page,location) => {
    return {
    "url": `https://meetnow.herokuapp.com/events?lat=${location.latitude}&lng=${location.longtitude}&page=${page}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  }};


  const onRefresh = async (loading) => {
    const loadingStatus = loading || REFRESHING
    setState({...state, status:loadingStatus})
    console.log("fetching data...")
 
    try {
      
      let resultingLocation = await setUserLocation()
      if (!resultingLocation) {
        // throw Error("Failed to find location")
        return
      }
  
      console.log("USER LOCATION: ", userLocation)
      const options = getOptions(1,resultingLocation)
      console.log("Refresh request: ", options)
      let res = await axios(options)
      const result = res.data;
      console.log("=====result=====");
      console.log(result)
      let newEvents = result.events;

      console.log("successfully fetched! ",newEvents.length)
      setState((prev)=>{
        console.log('setting state')
        return {
          ...state,
          events:newEvents,
          currentPage:1,
          totalPages:result.totalPages,
          status:""
        }
      });
    } catch (error) {
      console.log("failed to refresh: ",error);

      setState({...state, status:ERROR})

    }
  }
  console.log(state.status)

  const loadMore = () => {
    console.log('===========LOADING MORE ==========');
    console.log(state.currentPage, state.totalPages)
    if (state.currentPage == state.totalPages || state.totalPages == null) return;
    
    console.log("loaded more")
    setState({...state, status:LOADINGMORE})

    const options = getOptions(state.currentPage+1,userLocation)
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
        console.log("Error from Loading More: ",err)
      })
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
    
    let options = getOptions(1,userLocation);
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