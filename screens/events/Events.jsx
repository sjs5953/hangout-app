import React, {useState, useEffect} from 'react'
import { View, SafeAreaView, Platform, Linking, AppState, Dimensions } from 'react-native'
import * as IntentLauncher from 'expo-intent-launcher';
import {globalStyles} from '../../styles/global'
import axios from 'axios';
import EventsScreen from './EventsScreen'
import ToggleButton from './components/ToggleButton'
import {ERROR, REFRESHING, LOADING, LOADINGMORE} from '../../shared/status'
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
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
    "timeout": 3000,
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
        throw new Error('Permisson not given')
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
      console.log("failed to refresh: ",error);

      let status = await Location.getProviderStatusAsync();
      console.log("status.locationServicesEnabled ", status.locationServicesEnabled)
      if (!status.locationServicesEnabled) {
        console.log("Location Not enabled, Opennign MODAL")
        setState({...state,isLocationModalVisible:true, status:LOADING})
      } else {
        console.log("SETTING ERROR")
        setState({...state, status:ERROR})
      }
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
 
  useEffect(() => {
    AppState.addEventListener('change', handleChange);  
  
    return () => {
      AppState.removeEventListener('change', handleChange);  
    }
  }, []);
  

  const handleChange = (nextAppState) => {
    if(state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      onRefresh(LOADING)
    }
    setState({...state, appState: nextAppState });
  };


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