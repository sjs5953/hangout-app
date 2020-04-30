import React, {useState} from 'react'
import {styles} from './styles'
import {globalStyles} from '../../styles/global'

import MapView,{ PROVIDER_GOOGLE,  Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';



export default function MapScreen ({navigation, onRefresh, loadMore, status, events, searchEvents,userLocation}) {
  
  const initialRegion = {
    latitude: userLocation.latitude || 49.2576508,
    longitude: userLocation.longitude || -123.2536871,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  const [ map, setMap ] = useState({})

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
          // initialRegion={initialRegion}
          // onRegionChange={onRegionChange}
          region={initialRegion}
          >
            {events.map(event=>{
              return(
                <Marker
                  key={event._id}
                  onPress={()=>map.animateToRegion({
                    latitude: event.location[1],
                    longitude: event.location[0],
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07, 
                  })}
                  coordinate={{
                    latitude: event.location[1],
                    longitude: event.location[0]
                  }}
                title={event.name}
                description={event.address}
              />  
              )
            })}
            
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
    height:'100%',
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height,
  },
});
