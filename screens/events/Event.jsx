import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Event = ({navigation, route}) => {
  const title = route.params.item.title;
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default Event

const styles = StyleSheet.create({})
