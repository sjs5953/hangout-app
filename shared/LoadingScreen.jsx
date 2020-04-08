import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}><ActivityIndicator animating size={'large'}/></View>
  )
}
export default LoadingScreen

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent:'center',
    alignItems:'center',
    flex:1
  }
})

