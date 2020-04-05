import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const FlatButton = ({style, text, onPress}) => {
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.flatButton}>
        <Text style={styles.flatButtonText}> { text } </Text>
      </View>
    </TouchableOpacity>
  )
}

export const RoundButton = ({text, onPress, children}) => {
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.roundButton}>
        <Text style={styles.roundButtonText}> { children } </Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  flatButton: {
    borderRadius:8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71'
  },
  flatButtonText: {
    color:'white',
    fontWeight: 'bold',
    textTransform:'uppercase',
    fontSize:16,
    textAlign:'center'
  },
  roundButton: {
    borderRadius:100,
    paddingVertical: 14,
    paddingHorizontal: 10,
    // backgroundColor: '#f01d71',
    height:50,
    width:80,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:0.1,
    borderStyle:'solid',
    borderColor:"#333",
    
    elevation:3,
    backgroundColor:'#fff',
    shadowOffset: {
      width:1,
      height:1
    },
    shadowRadius:2,
  },
  roundButtonText: {
    color:'#333',
    // fontWeight: 'bold',
    textTransform:'uppercase',
    fontSize:16,
    textAlign:'center'
  },
 
})

