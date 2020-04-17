import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { styles } from '../styles'
import { Button } from 'react-native-paper';
const NoResults = ({onRefresh}) => {
  return (
    <View style={styles.noResults}>
      <Text>No results found</Text>
      <Button onPress={onRefresh}>
        Refresh
      </Button>
      </View>
  )
}

export default NoResults