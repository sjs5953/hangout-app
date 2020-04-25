import React, {useState, useEffect} from 'react'
import { View,Alert, SafeAreaView, Platform, Linking, AppState, Dimensions } from 'react-native'
import * as IntentLauncher from 'expo-intent-launcher';
import {globalStyles} from '../../styles/global'
import axios from 'axios';
import EventsScreen from './EventsScreen'
import ToggleButton from './components/ToggleButton'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal'
const isIos = Platform.OS === 'ios'

const Events = ({navigation,route}) => { 

  const [state, setState] = useState({
    events:[],
    location:{},
    currentPage:1,
    totalPages:null,
    status:LOADING,
    listView: true,
    isLocationModalVisible:false,
    appState: AppState.currentState
  });

  const openSetting = () => {
    if (isIos) {
      Linking.openURL('app-settings:')
      return
    } 

    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);


    setState({...state, openSetting:false})
  }
  
  const getOptions = (page, location) => {
    return {
    "url": `https://meetnow.herokuapp.com/events?limit=5&page=${page}`,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    },
    "data": location,
  }};

  const getLocation = async () => {
    let location=null;
    console.log('getting location...')
    try {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          console.log("here?", response)
          // throw Error('Permission to access was denied!')
        }
      } else {
        location = await Location.getCurrentPositionAsync({});
      }
      return location
    }
    catch (err) {
      console.log("Failed getLocation()")
      let status = await Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        setState({...state,isLocationModalVisible:true})
      }
    }
  }

  const onRefresh = async (loading) => {
    const loadingStatus = loading || REFRESHING
    setState({...state, status:loadingStatus})
    console.log("fetching data...")
 
    try {
      
      let resultingLocation = await getLocation()
      if (!resultingLocation) {
        // throw Error("Failed to find location")
        return
      }
      const userLocation = {
        latitude: resultingLocation.coords.latitude,
        longitude: resultingLocation.coords.longitude
      }
      console.log("USER LOCATION: ", userLocation)
      const options = getOptions(1,userLocation)
      console.log("Refresh request: ", options)
      let res = await axios(options)
      const result = res.data;
      let newEvents = result.events;

      console.log("successfully fetched! ",newEvents.length)
      console.log("refreshing options: ",options)
      setState((prev)=>{
        console.log('setting state')
        return {
          ...state,
          location:userLocation,
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

  const handleChange = (nextAppState) => {
    console.log("Handle Change")
  //  
    if( /*state.appState.match(/inactive|background/) &&*/ nextAppState === 'active') {
      console.log('App has come to the foreground!');
      onRefresh(LOADING)
    }
    setState({...state, appState: nextAppState });
  };
 
  useEffect(() => {
    console.log("USEFFECT WITH handle change ran")
    AppState.addEventListener('change', handleChange);  
  
    return () => {
      AppState.removeEventListener('change', handleChange);  
    }
  }, [state.openSetting]);

   useEffect(()=>{
    console.log("refreshed")
    onRefresh(LOADING)
  },[route.params])
  
  return (
    <View style={globalStyles.container}>
        <Modal
          onModalHide={state.openSetting?openSetting:undefined} 
          isVisible={state.isLocationModalVisible}
          style={{
            height: '100%',
            width:'100%',
            margin:0,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'white'
          }}
        >
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Button onPress={()=>{
              setState({
                ...state,
                isLocationModalVisible:false,
                openSetting:true
              })
            }}>
              Enable Location Services
            </Button>
          </View>

        </Modal>

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