import React from 'react'
import { View } from 'react-native'
import { RoundButton } from '../../../shared/Button';
import {FontAwesome5} from '@expo/vector-icons';
import {styles} from '../styles'

const ToggleButton = ({listView, toggleView}) => {
  return (
    <View style={styles.toggleContainer}>
        <RoundButton onPress={toggleView} style={{height:50}}>
          {listView?
            <FontAwesome5 name="map" color={"black"} size={30} /> :
            <FontAwesome5 name="list-ul" color={"black"} size={30} />}
        </RoundButton>
      </View>
  )
}
export default ToggleButton