import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RoundButton } from '../../../shared/Button';
import {FontAwesome5} from '@expo/vector-icons';
import {styles} from '../styles'


const ToggleButton = ({listView, toggleView}) => {
  const customStyles = StyleSheet.create({
    toggleContainer:{
      position:'absolute',
      bottom:listView?20:90,
      right:5
    },
  })  
  
  return (
    <View style={customStyles.toggleContainer}>
        <RoundButton onPress={toggleView} style={{height:55,width:75}}>
          {listView?
            <FontAwesome5 name="map" color={"black"} size={30} /> :
            <FontAwesome5 name="list-ul" color={"black"} size={30} />}
        </RoundButton>
      </View>
  )
}
export default ToggleButton

