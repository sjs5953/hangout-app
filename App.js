import React,{useState, useEffect, useMemo} from 'react';
import { AppLoading } from 'expo'
import { StyleSheet, Text, View, Alert, SafeAreaView, Platform, Linking, AppState, Dimensions, ActivityIndicator } from 'react-native';
import { AuthContext } from './context'

import TabNavigator from './routes/tabNavigator'
import { globalStyles } from './styles/global';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal'
const isIos = Platform.OS === 'ios'

export default function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState("")
  const [userLocation, setUserLocation] = useState({})
  
  const [state, setState] = useState({
    isLocationModalVisible:false,
    appState: AppState.currentState
  });
  
  let authContext = useMemo(()=>{
    return {
      signIn: (token) => {
        console.log("========Attempting Login========", token);
        setUserToken(token);
      },
      signOut: () => {
        setUserToken(null);
        console.log("Signed Out");
      },
      setUserLocation : async() => {
        const userLoc = await getLocation();
        console.log("====Setting User Location As...====");
        console.log(userLoc)
        setUserLocation(userLoc);
        return userLoc
      },
      userToken,
      userLocation
    }
  },[userToken,userLocation])

  const openSetting = () => {
    if (isIos) {
      Linking.openURL('app-settings:')
      return
    } 
    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);

    setState({...state, openSetting:false})
  }
  
 
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
        const result = await Location.getCurrentPositionAsync({});
        location = {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude
        }
      }
      console.log("result: ", location)
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

  const handleChange = (nextAppState) => {
    console.log("Handle Change")
  //  
    if( /*state.appState.match(/inactive|background/) &&*/ nextAppState === 'active') {
      console.log('App has come to the foreground!');
      authContext.setUserLocation()
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
    // (async()=>{
    //   await authContext.setUserLocation();
    //   setIsLoading(false)
    // })()
    authContext.setUserLocation();
  },[])

  console.log("userloc state: ", userLocation)

  if(isLoading) {

    return (
      <View style={styles.container}>
        <ActivityIndicator animating size={"large"}/>
      </View>
    )
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };
  
  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
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
        <TabNavigator userToken={userToken} setUserToken={setUserToken} />
      </PaperProvider>
    </AuthContext.Provider>
  );
}

AppRegistry.registerComponent('app', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
