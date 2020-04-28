import React, {useState,useEffect} from 'react'
import {styles} from '../styles'
import {globalStyles} from '../../../styles/global'

import MapView,{ PROVIDER_GOOGLE,  Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function Maps ({name, address, coordinates, userLocation, setSelectedLoc, savedLocation}) {

  const initialLat = userLocation.latitude;
  const initialLng = userLocation.longitude;
  const markerLat = coordinates.lat;
  const markerLng = coordinates.lng;

  console.log("coordinates ", coordinates)
  console.log("userlocation: ", userLocation)
  console.log("savedLocation ", savedLocation)
  const initialRegion = {
    latitude: savedLocation.lat ? savedLocation.lat: userLocation.latitude  ,
    longitude: savedLocation.lng ? savedLocation.lng: userLocation.longitude,
    latitudeDelta: savedLocation.lat ? 0.03 : 0.0922,
    longitudeDelta: savedLocation.lat ? 0.01 : 0.0421, 
  }
   const [ region, setRegion ] = useState(initialRegion);
   const [ map, setMap ] = useState({}); 

   const onRegionChange = (newRegion) => {
     setRegion(newRegion)
   }

  
  console.log("name, ",name)
  
  console.log("region: ",region)
  
  console.log("initialLat ", initialLat)
  console.log("initialLng ",initialLng)
  console.log("savedLat ",savedLocation.lat)
  console.log("savedLng ",savedLocation.lng) 
  console.log("markerLat ",markerLat)
  console.log("markerLng ",markerLng)
  // console.log("map ", map)

  useEffect(() => {
    console.log("did i run")
    if (map && markerLat && markerLng ) {
      map.animateToRegion({
        latitude: markerLat,
        longitude: markerLng,
        latitudeDelta: 0.03,
        longitudeDelta: 0.01, 
      })
      // setRegion({
      //   latitude: markerLat,
      //   longitude: markerLng,
      //   latitudeDelta: 0.03,
      //   longitudeDelta: 0.01, 
      // })
    }
  }, [markerLat,markerLng])

  return (
    <View style={customStyles.container}>
      <View style={customStyles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          style={customStyles.mapStyle}
          ref={map => setMap(map)}
          initialRegion={region}
          // onRegionChange={onRegionChange}
          // region={region}
          >
            {savedLocation.lat||coordinates.lat? 
            <Marker
              draggable={true}
              onPress={()=>map.animateToRegion({
                latitude: markerLat ? markerLat : savedLocation.lat,
                longitude: markerLng ? markerLng : savedLocation.lng,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008, 
              })}
              onDragEnd={(marker)=> {
                console.log(marker.nativeEvent.coordinate)
                setSelectedLoc(prev=>{
                  return{...prev, geometry:{
                   lat:marker.nativeEvent.coordinate.latitude,
                   lng:marker.nativeEvent.coordinate.longitude 
                  }}
                })
                }}
              coordinate={{
                latitude: markerLat ? markerLat : savedLocation.lat,
                longitude: markerLng ? markerLng : savedLocation.lng,
              }}
              title={'Event Location'}
              description={address}
            />        
              :
              console.log("Marker not Generated!!!!")
              }
          </MapView>
      </View>
    </View>
  )
}

const customStyles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:10,
    paddingTop:15,
    paddingBottom:0,
  },
  mapContainer:{

  },
  mapStyle: {
    width:'100%',
    height:'95%',
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height,
  },
});
