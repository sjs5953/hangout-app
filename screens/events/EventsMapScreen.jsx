import React, {useState} from 'react'
import { Text, View,Picker, PickerIOS } from 'react-native'
import {styles} from './styles'

export default () => {
  const [selectedValue, setSelectedValue] = useState("")
  return (
    <View>
      {/* <Text>Mapview!</Text> */}
      <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: 150 }}
        mode='dialog'
        prompt='Pick your thing'
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>      
    </View>
  )
}
