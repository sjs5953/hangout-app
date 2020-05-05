import React, {useState,useEffect} from 'react'
import {styles} from '../styles'
import {globalStyles} from '../../../styles/global'

import MapView,{ PROVIDER_GOOGLE,  Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function Map ({event}) {

  let lat = 0;
  let lng = 0;
  if (event.location){
    lat = event.location[1]
    lng = event.location[0]
  }
 
  console.log("event: ",event)
  console.log('lat: ', lat)
  console.log('lng: ',lng)

  const initialRegion = {
    latitude:lat,
    longitude:lng,
    latitudeDelta: 0.009,
    longitudeDelta: 0.008, 
  }
  return (
    <View style={customStyles.container}>
      <View style={customStyles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          style={customStyles.mapStyle}
          region={initialRegion}
          >
            <Marker
              coordinate={{
                latitude: lat,
                longitude:lng,
              }}
              title={event.name}
              description={event.address}
            />        
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
    height:200,
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height,
  },
});
