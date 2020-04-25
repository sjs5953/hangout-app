import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { styles } from '../screens/events/styles'
import { Button } from 'react-native-paper';
const Error = ({onRefresh}) => {
  return (
    <View style={styles.noResults}>
      <Text>Sorry, something went wrong...</Text>
      <Button onPress={onRefresh}>
        Refresh
      </Button>
      </View>
  )
}

export default Error