import React from 'react'
import { View } from 'react-native'
import { RoundButton } from '../../shared/Button';
import {FontAwesome5} from '@expo/vector-icons';
import {styles} from './styles'

const ToggleButton = ({listView, toggleView}) => {
  return (
    <View style={styles.toggleContainer}>
        <RoundButton onPress={toggleView}>
            <FontAwesome5 name="map" color={"black"} size={30} />
        </RoundButton>
      </View>
  )
}
export default ToggleButton