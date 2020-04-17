import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const FlatButton = ({style, text, onPress}) => {
  if (style) {
    styles = {...styles, ...style}
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.flatButton}>
        <Text style={styles.flatButtonText}> { text } </Text>
      </View>
    </TouchableOpacity>
  )
}

export const RoundButton = ({selectedItem, style, onPress, children}) => {
  if (style) {
    styles.roundButton = {...styles.roundButton , ...style}
  }
  if (selectedItem==children) {
    styles.roundButton = {...styles.roundButton , backgroundColor:'grey'}
  } else {
    styles.roundButton = {...styles.roundButton , backgroundColor:'#fff'}
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.roundButton}>
        <Text style={styles.roundButtonText}> { children } </Text>
      </View>
    </TouchableOpacity>
  )
}


let styles = StyleSheet.create({
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
    // paddingVertical: 14,
    // paddingHorizontal: 10,
    // backgroundColor: '#f01d71',
    padding:0,
    height:44,
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
    fontSize:13,
    textAlign:'center',
    margin:0,
    paddingRight:4,
    fontWeight:'bold'
  },
 
})

