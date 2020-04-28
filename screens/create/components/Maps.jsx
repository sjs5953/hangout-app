import React, {useState,useEffect} from 'react'
import {styles} from '../styles'
import {globalStyles} from '../../../styles/global'

import MapView,{ PROVIDER_GOOGLE,  Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function Maps ({name, address, coordinates, userLocation, setSelectedLoc}) {

  const initialLat = userLocation.latitude;
  const initialLng = userLocation.longitude;
  const markerLat = coordinates.lat;
  const markerLng = coordinates.lng;

  const initialRegion = {
    latitude: userLocation.latitude || 49.2576508,
    longitude: userLocation.longtitude || -123.2536871,
    // latitude:  49.2576508,
    // longitude: -123.2536871,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421, 
  }
   const [ region, setRegion ] = useState(initialRegion);
   const [ map, setMap ] = useState(null);  
   const onRegionChange = (newRegion) => {
     setRegion(newRegion)
   }

  
  console.log("name, ",name)
  
  console.log("region: ",region)
  
  console.log("initialLat ", initialLat)
  console.log("initialLng ",initialLng)
  console.log("markerLat ",markerLat)
  console.log("marketLng ",markerLng)
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
          // initialRegion={{
          //     latitude: 0,
          //     longitude: 0,
          //     latitudeDelta: 0,
          //     longitudeDelta: 0, 
          //   }}
          // onRegionChange={onRegionChange}
          region={region}
          >
            {coordinates.lat? 
            <Marker
              draggable={true}
              onPress={()=>map.animateToRegion({
                latitude: markerLat,
                longitude: markerLng,
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
                latitude: coordinates.lat,
                longitude:coordinates.lng,
              }}
              title={'Event Location'}
              description={address}
            />        
              :
              null 
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
