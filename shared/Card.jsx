import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const Card = ({containerStyle,children}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  )
}

export default Card

let styles = StyleSheet.create({
  card: {
    borderRadius:6,
    elevation:3,
    backgroundColor:'#fff',
    shadowOffset: {
      width:1,
      height:1
    },
    shadowRadius:2,
    marginHorizontal:4,
    marginVertical:6,
    // padding:5
  },
  cardContent: {
    marginHorizontal:18,
    marginVertical:10
  }
})
