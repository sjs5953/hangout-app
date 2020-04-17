import React from 'react'
import { View, Text } from 'react-native'
import { RoundButton } from '../../../shared/Button'
import {FontAwesome5} from '@expo/vector-icons';
import {styles} from '../styles'

const FloatingButtonItem = ({text,onPress,selectedItem}) => {
  return (
    <View>
        <RoundButton selectedItem={selectedItem} onPress={onPress} style={{height:40,width:100,marginLeft:0, marginRight:15, marginVertical:0}} >
          {text}
        </RoundButton>
      </View>
  )
}
export default FloatingButtonItem