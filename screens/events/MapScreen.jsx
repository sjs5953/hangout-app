import React, {useState} from 'react'
import {styles} from './styles'
import {globalStyles} from '../../styles/global'

import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';



export default function MapScreen ({navigation, onRefresh, loadMore, status, events, searchEvents}) {
  
   const [ region, setRegion ] = useState({});
   const [ markers, setMarkers ]= useState=[];
   
   const onRegionChange = (newRegion) => {
     setRegion(newRegion)
   }

  return (
    <View style={customStyles.container}>
      <View style={customStyles.mapContainer}>
        <MapView 
          style={customStyles.mapStyle}
          initialRegion={{
            latitude: 49.2576508,
            longitude: -123.2536871,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={onRegionChange}
          >
            {/* some markers */}
          </MapView>
      </View>
    </View>
  )
}

const customStyles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:10,
    paddingVertical:15
  },
  mapContainer:{

  },
  mapStyle: {
    width:'100%',
    height:'100%'
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height,
  },
});
